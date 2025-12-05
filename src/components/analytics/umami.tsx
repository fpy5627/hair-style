/**
 * Umami 统计组件
 * 用于集成 Umami 网站分析工具
 * 
 * @returns Umami 统计脚本组件，如果未配置或非生产环境则返回 null
 */
export default function Umami() {
  // 仅在生产环境启用
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;

  // 如果未配置 Umami 相关环境变量，则不渲染
  if (!umamiWebsiteId || !umamiScriptUrl) {
    return null;
  }

  return (
    <script
      async
      defer
      data-website-id={umamiWebsiteId}
      src={umamiScriptUrl}
    ></script>
  );
}

