export interface HairColorPromptParams {
    targetHairColor: string;
    colorStyle?: string;
    intensityLevel?: string;
    saturationControl?: string;
}

/**
 * 生成 AI 发色修改的标准化提示词
 * 
 * 任务：在不改变人物身份与画面构图的前提下，仅修改“头发颜色”，生成写实自然的试戴效果图。
 */
export const generateHairColorPrompt = ({
    targetHairColor,
    colorStyle = "写实自然",
    intensityLevel = "适中",
    saturationControl = "自然平衡"
}: HairColorPromptParams): string => {
    return `任务：在不改变人物身份与画面构图的前提下，仅修改“头发颜色”，生成写实自然的试戴效果图。

必须保持不变（严格）：
- 人脸五官、脸型、肤色、妆容、嘴唇颜色不变
- 眼睛、眉毛、睫毛不变
- 眼镜/配饰不变（尤其镜片反光颜色不变）
- 衣服颜色与纹理不变
- 背景不变（或仅允许极轻微曝光/色温一致性调整）
- 保留原始发丝细节与质感：发丝走向、发根/发梢层次、发量与卷直度不变
- 保留真实光照：高光、阴影、发丝反光自然一致

需要修改：
- 仅将头发颜色改为：${targetHairColor}

输出风格：
- 写实人像摄影风格，皮肤纹理自然
- 颜色过渡柔和，不出现大面积染色溢出到皮肤或背景
- 头发区域上色要均匀但保留渐变：发根略深、发梢略浅（除非${colorStyle}要求纯色）

限制与排除（禁止）：
- 不要改变皮肤色相/明暗，不要让脸部或颈部被染色
- 不要改变口红色或牙齿颜色
- 不要改变衣服与背景的色调
- 不要添加文字、水印、logo、边框
- 不要改变发型形状，不要改变刘海/长度/分缝
- 不要增加夸张的卡通渲染或插画风

颜色强度：
- 上色强度：${intensityLevel}
- 饱和度控制：${saturationControl}
- 真实感优先：避免过曝和荧光感，除非目标色明确要求高饱和

附加要求：
- 如果目标色是冷色/银灰/铂金：保持肤色温暖自然，不要整体变冷
- 如果目标色是红色/铜色：避免皮肤偏红，脸部仍保持原本肤色`;
};
