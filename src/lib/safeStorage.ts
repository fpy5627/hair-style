/**
 * 安全的 localStorage 存储工具
 * 用于处理 hairnova_history，防止超限崩溃
 */

/**
 * 安全的 JSON 序列化，避免循环引用
 */
export function safeJsonStringify(value: any): string {
  const seen = new WeakSet();

  try {
    return JSON.stringify(value, (key, val) => {
      // 处理对象类型
      if (typeof val === 'object' && val !== null) {
        if (seen.has(val)) {
          return '[Circular Reference]';
        }
        seen.add(val);
      }
      return val;
    });
  } catch (error) {
    console.warn('[Hairnova] JSON stringify failed, fallback to empty object', error);
    return '{}';
  }
}

/**
 * 估算字符串的字节数（UTF-8）
 */
export function estimateBytes(str: string): number {
  try {
    const encoder = new TextEncoder();
    return encoder.encode(str).length;
  } catch (error) {
    // Fallback: 粗略估算（每个字符按 3 字节计）
    return str.length * 3;
  }
}

/**
 * 清理 history 记录中的超大字段
 * 移除 base64、dataURL、blob 等字段，但保留必要的 URL 引用
 */
export function sanitizeHairnovaHistory(rawHistory: any[]): any[] {
  if (!Array.isArray(rawHistory)) {
    return [];
  }

  // 需要保留的字段（即使名字类似也不删除）
  const fieldsToKeep = [
    'resultImageUrl',
    'originalImageUrl',
    'sourceThumb',
    'resultThumb',
    'styleId',
    'styleName',
    'colorId',
    'id',
    'createdAt'
  ];

  // 明确需要移除的字段（通常包含 base64 大数据）
  const fieldsToRemove = [
    'image',
    'imageBase64',
    'base64',
    'dataUrl',
    'dataURL',
    'previewBase64',
    'resultBase64',
    'originalBase64',
    'maskBase64',
    'blob',
    'file',
    'rawImage',
    'fullImage',
  ];

  const MAX_STRING_LENGTH = 50000; // 增加到 50KB，允许小尺寸图片 URL

  return rawHistory.map((item) => {
    if (!item || typeof item !== 'object') {
      return item;
    }

    // 创建副本避免修改原对象
    const sanitized: any = {};

    for (const [key, value] of Object.entries(item)) {
      // 如果在保留列表中，直接保留
      if (fieldsToKeep.includes(key)) {
        sanitized[key] = value;
        continue;
      }

      // 如果在移除列表中，跳过
      if (fieldsToRemove.includes(key)) {
        continue;
      }

      // 对于字符串，检查是否是超大 base64
      if (typeof value === 'string') {
        // 如果是 data URL（base64 图片），且超过限制，则移除
        if (value.startsWith('data:image') && value.length > MAX_STRING_LENGTH) {
          // 保留一个小的占位符，表明这里曾有图片
          sanitized[key] = 'data:image/placeholder';
          continue;
        }

        // 普通字符串，如果过长则截断
        if (value.length > MAX_STRING_LENGTH) {
          sanitized[key] = value.substring(0, MAX_STRING_LENGTH) + '…';
        } else {
          sanitized[key] = value;
        }
      } else {
        // 非字符串类型直接保留
        sanitized[key] = value;
      }
    }

    return sanitized;
  });
}

/**
 * 安全写入 history 到 localStorage
 * 包含容量控制、异常处理、自动降级
 */
export function safeSetHistoryToLocalStorage(
  history: any[],
  opts?: {
    maxItems?: number;
    maxBytes?: number;
  }
): void {
  const KEY = 'hairnova_history';
  const MAX_ITEMS = opts?.maxItems ?? 10;
  const MAX_BYTES = opts?.maxBytes ?? 2_500_000; // ~2.5MB

  try {
    // Step 1: 清理数据
    let sanitized = sanitizeHairnovaHistory(history);

    // Step 2: 限制条数
    sanitized = sanitized.slice(0, MAX_ITEMS);

    // Step 3: 检查容量并逐步减少
    let attempt = 0;
    const maxAttempts = 5;

    while (sanitized.length > 0 && attempt < maxAttempts) {
      const jsonString = safeJsonStringify(sanitized);
      const byteSize = estimateBytes(jsonString);

      // 如果容量合理，尝试写入
      if (byteSize <= MAX_BYTES) {
        try {
          localStorage.setItem(KEY, jsonString);

          // 写入成功，记录日志
          if (attempt > 0 || sanitized.length < history.length) {
            console.warn(
              `[Hairnova] History reduced from ${history.length} to ${sanitized.length} items (${(byteSize / 1024).toFixed(1)}KB)`
            );
          }

          return; // 成功写入，退出
        } catch (setItemError: any) {
          // QuotaExceededError - 尝试清空后重试
          if (
            setItemError.name === 'QuotaExceededError' ||
            setItemError.message?.includes('quota')
          ) {
            console.warn('[Hairnova] localStorage quota exceeded, attempting cleanup...');

            try {
              localStorage.removeItem(KEY);
              localStorage.setItem(KEY, jsonString);
              console.warn(`[Hairnova] Cleanup successful, saved ${sanitized.length} items`);
              return;
            } catch (retryError) {
              // 清空后仍失败，继续减少条数
              console.warn('[Hairnova] Retry after cleanup failed, reducing items...');
            }
          } else {
            // 其他错误，静默失败
            console.warn('[Hairnova] localStorage setItem failed (non-quota error)', setItemError);
            return;
          }
        }
      }

      // Step 4: 容量仍超限，减少 20% 条数
      const reduction = Math.max(1, Math.floor(sanitized.length * 0.2));
      sanitized = sanitized.slice(0, sanitized.length - reduction);
      attempt++;
    }

    // 所有尝试失败，静默处理
    console.warn(
      '[Hairnova] Failed to save history to localStorage after multiple attempts. History skipped.',
      { originalLength: history.length, attempts: attempt }
    );
  } catch (error) {
    // 捕获所有异常，绝不向上抛出
    console.warn('[Hairnova] Unexpected error in safeSetHistoryToLocalStorage', error);
  }
}

/**
 * 安全读取 history 从 localStorage
 * 
 * @returns 历史记录数组，解析失败或不存在时返回空数组
 */
export function safeGetHistoryFromLocalStorage(): any[] {
  const KEY = 'hairnova_history';

  try {
    const saved = localStorage.getItem(KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    // 确保返回数组
    if (Array.isArray(parsed)) {
      return parsed;
    }

    console.warn('[Hairnova] History is not an array, returning empty array');
    return [];
  } catch (error) {
    console.warn('[Hairnova] Failed to parse history from localStorage, returning empty array', error);
    return [];
  }
}
