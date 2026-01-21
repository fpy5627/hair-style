# Hairnova AI - Men's Hairstyles 页面设计规范（可上线版）

## 📐 页面架构（从上到下）

### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### 模块 1: Hero 首屏区（First Screen - Above the Fold）
### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**SEO H1（双语）**
```
主标题（英文）: Hairstyles for Men
副标题（中文）: 男士发型库 + AI 脸型匹配推荐
```

**引导段落（Intro Paragraph）**
```
英文（80-100 words）:
Upload your photo — AI recommends men's haircuts that fit your face shape. 
Powered by advanced face analysis technology, Hairnova AI analyzes your facial 
structure (jaw line, forehead, face proportion) and suggests the best hairstyles 
from 500+ men's options including Buzz Cut, Fade, Pompadour, Undercut, and more.

中文（60-80字）:
上传照片，AI 根据脸型推荐最适合你的男士发型。基于先进的人脸分析技术，
Hairnova AI 自动识别你的脸型结构（下颌线、额头、面部比例），从 500+ 
男士发型中推荐最佳选择：寸头、渐变、背头、Undercut 等。
```

**三大卖点（Trust Badges）**
```
✓ AI 识别脸型与比例，推荐更适合的男士发型
✓ 不改变五官，只更换发型与发色（真实可信）
✓ 覆盖 500+ 男士发型：寸头/渐变/背头/侧分/卷发等
```

**主 CTA（紫色渐变按钮）**
```
文案: 立即上传照片，开始男士发型推荐
英文: Upload Photo & Get AI Recommendations
样式: 紫色渐变 + 矩形圆角(12px) + 阴影悬浮效果
```

**次 CTA（文字链接）**
```
文案: 或浏览男士发型库 ↓
英文: Or browse men's hairstyle library
样式: 下划线 + hover 紫色
```

**右侧预览卡片（Desktop）/ 下方卡片（Mobile）**
```
内容:
- 男士头像示例（方形头像，清晰五官）
- Face Shape 标签：Oval / Square / Diamond
- 3张推荐发型卡片（横排，圆角卡片）
- BEST MATCH 徽章（金色）
- 发色切换小圆点（底部，自然色系为主）
```

---

### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### 模块 2: 在线体验 AI 工具区（Tool Try-on Section）
### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**锚点 ID**: `#try-now`

**标题（居中）**
```
主标题: 在线体验 AI 男士发型推荐
英文: Try AI Men's Hairstyle Recommendations Online
副标题: 上传照片后即可实时预览适合你的男士发型与发色
```

**工具布局（两栏 Desktop / 单栏 Mobile）**

左侧：上传区
```
- 虚线边框卡片（border-dashed, 高度 320px）
- Icon: 上传图标（Upload）
- 文案: "点击或拖拽照片"
- 支持格式: JPG, PNG, WebP (max 10MB)
- 按钮: "选择文件" | "拍照" | "示例图片"
  样式: 矩形圆角(8px), 边框按钮
```

右侧：结果预览区
```
空状态:
- Icon: AI 图标 + 虚线轮廓
- 文案: "上传照片后生成男士发型预览"
- 提示: "AI 将自动分析你的脸型并推荐适合的发型"

生成状态:
- 显示原图 + 生成的发型效果（左右对比或上下对比）
- 按钮组: 下载 | 再次生成 | 换发型
```

**下方推荐区**
```
标题: 热门男士发型推荐
布局: 3-6 张卡片（规则网格，非瀑布流）
卡片内容:
  - 男士发型图片（统一比例 3:4）
  - 发型名称（如 "Buzz Cut"）
  - 标签（短发 · 男士 / 商务 · 男士）
  - 按钮: "用我的照片试试"（矩形圆角）
```

---

### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### 模块 3: 男士发型库（Men's Hairstyle Library）
### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**锚点 ID**: `#men-hairstyles-library`

**标题（居中）**
```
主标题: Men's Hairstyle Library（男士发型库）
英文: Men's Hairstyle Library
副标题: 按脸型/长度/风格快速筛选适合你的男士发型
```

**筛选器（单行紧凑布局，矩形圆角）**
```
性别筛选:
  [男士] (高亮紫色)  [女士] (灰色边框)
  
长度筛选:
  [Short] (高亮)  [Medium]  [Long]
  
风格筛选:
  [Classic]  [Trendy]  [Business]  [Curly]
  
排序:
  [Recommended] (高亮)  [Popular]  [New]

样式规范:
- 所有按钮: 矩形 + 圆角(8px)
- 高亮: 紫色背景 + 白色文字
- 未高亮: 白色背景 + 灰色边框 + hover 紫色
- 禁止使用胶囊形状（pill shape）
```

**发型网格（规则网格，非瀑布流）**
```
布局: 
- Desktop: 4 列
- Tablet: 3 列
- Mobile: 2 列

每张卡片:
- 图片比例: 3:4（统一）
- 男士头像（清晰展示发型）
- 发型名称: 如 "Buzz Cut"
- 标签: [短发 · 男士]  [商务]
- 按钮: "用我的照片试试"
  样式: 矩形圆角(8px), 紫色 hover

卡片样式:
- 白色背景
- 边框: 1px solid #e2e8f0
- 圆角: 12px
- hover: 阴影提升 + 轻微上移(-2px)
```

**分页（底部居中）**
```
[<] [1] [2] [3] ... [10] [>]
样式: 矩形圆角(8px), 当前页紫色背景
```

---

### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### 模块 4: AI 工作流程（How It Works）
### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**标题**
```
主标题: AI 男士发型推荐只需 3 步
英文: AI Men's Hairstyle Recommendations in 3 Steps
副标题: 无需任何设计经验，上传照片即可开始体验
```

**三步流程（横排卡片）**
```
Step 1: 上传照片
- Icon: 上传图标 (Camera)
- 文案: "上传一张清晰正脸照片，支持 JPG / PNG 格式"

Step 2: AI 识别脸型与比例
- Icon: 扫描图标 (Target)
- 文案: "系统自动分析额头、下颌线、发际线等男士关键特征，作为发型推荐依据"

Step 3: 推荐更适合的男士发型 + 支持试发色
- Icon: 魔法棒图标 (Sparkles)
- 文案: "基于分析结果推荐发型和发色，并生成真实可参考的效果预览"

样式:
- 3列卡片（Mobile: 单列）
- 白色背景 + 边框 + 阴影
- 矩形圆角(12px)
- 序号徽章: 01, 02, 03（紫色背景）
```

---

### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### 模块 5: 使用场景（Use Cases）
### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**标题**
```
主标题: 这些场景下，AI 男士发型推荐特别有用
英文: When AI Men's Hairstyle Recommendations Help Most
```

**四大场景（2x2 网格）**
```
1. 面试 / 商务形象
   Icon: User
   文案: 在面试或重要商务场合前，选择更专业、得体的男士发型提升形象

2. 约会 / 社交头像
   Icon: Camera
   文案: 在约会或更换社交头像时，快速找到更有魅力、更适合自己的发型风格

3. 理发前确认（避免翻车）
   Icon: Scissors
   文案: 在理发前提前预览效果，避免剪完后悔，降低发型决策风险

4. 发际线 / 头型修饰
   Icon: Target
   文案: 针对发际线高、头型偏平等男士常见问题，找到视觉修饰效果最好的发型
```

---

### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### 模块 6: FAQ 常见问题
### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**标题**
```
主标题: 常见问题
英文: Frequently Asked Questions
```

**5 个核心问题（折叠式手风琴）**
```
Q1: Hairstyles for men 怎么选最适合我的？
A1: 上传你的照片后，AI 会自动分析你的脸型（如圆脸、方脸、长脸等）和面部比例，
    然后根据这些特征推荐最适合你的男士发型，包括寸头、渐变、背头、侧分、卷发等多种风格。

Q2: AI 会改变我的脸吗？
A2: 不会。Hairnova AI 仅对发型和发色进行模拟，绝不会改变你的五官或面部结构。
    生成的效果真实可信，让你能准确预判理发后的样子。

Q3: 适合发际线高/圆脸/方脸的男士发型有哪些？
A3: • 发际线高：建议尝试刘海覆盖或侧分发型来视觉修饰
    • 圆脸：适合有层次感的侧分、渐变发型来拉长脸型
    • 方脸：推荐柔和的卷发或蓬松的背头来柔化轮廓
    上传照片后，AI 会自动为你筛选最合适的选项。

Q4: 支持哪些男士发型？是否支持寸头/渐变/背头？
A4: 支持 500+ 男士发型，包括但不限于：Buzz Cut（寸头）、Fade（渐变）、
    Taper Fade、Crew Cut、Undercut、Side Part（侧分）、Quiff、
    Pompadour（背头）、Curly Hair、Long Hair 等多种风格，持续更新中。

Q5: 上传照片安全吗？
A5: 绝对安全。你的照片仅用于生成发型效果，不会被公开、分享或用于其他用途。
    我们重视用户隐私保护。

样式:
- 白色卡片 + 边框 + 矩形圆角(12px)
- 问题: 粗体黑色
- 答案: 灰色文字（展开时显示）
- Icon: ChevronDown（展开时旋转180度）
```

---

### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### 模块 7: SEO 内链区（Internal Links Cluster）
### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**区块 1: 热门男士发型搜索**
```
标题: 热门男士发型搜索
英文: Popular Men Hairstyles - 点击快速浏览

标签（chips）:
[Buzz Cut] [Fade] [Taper Fade] [Crew Cut] [Undercut] 
[Side Part] [Quiff] [Pompadour] [Curly Hair Men] 
[Long Hair Men] [Mullet] [Textured Crop] [Ivy League] 
[Caesar Cut] [Slick Back]

样式:
- 白色背景 + 灰色边框 + 矩形圆角(8px)
- hover: 紫色边框 + 紫色文字 + 浅紫背景
- 可点击（跳转到详情页或发型库）
```

**区块 2: 按脸型查找男士发型**
```
标题: 按脸型查找男士发型
英文: Browse by Face Shape

标签（chips with gradient）:
[Men hairstyles for oval face]
[Men hairstyles for round face]
[Men hairstyles for square face]
[Men hairstyles for long face]
[Men hairstyles for heart face]
[Men hairstyles for diamond face]

样式:
- 紫色渐变背景 + 矩形圆角(10px)
- 粗体文字
- hover: 阴影提升
```

---

### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### 模块 8: 底部 CTA（Final Call-to-Action）
### ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**玻璃卡片（居中）**
```
标题: 准备好找到真正适合你的男士发型了吗？
英文: Ready to Find Your Perfect Men's Hairstyle?

副标题: 上传照片，立即查看效果
英文: Upload your photo and see results instantly

按钮: 立即上传照片，开始男士发型推荐 →
英文: Upload Photo & Get AI Recommendations
样式: 紫色渐变 + 矩形圆角(14px) + 大尺寸(h-14)

样式:
- 玻璃质感卡片（backdrop-blur + 半透明）
- 渐变背景光晕
- 居中对齐
```

---

## 🎨 全局设计规范

### 颜色系统
```css
主色: 紫色渐变
  - Primary: #6366f1 (Indigo 500)
  - Secondary: #8b5cf6 (Purple 500)
  - Gradient: linear-gradient(135deg, #6366f1, #8b5cf6)

辅助色:
  - Success: #10b981 (Emerald 500)
  - Warning: #f59e0b (Amber 500)
  - Error: #ef4444 (Red 500)

中性色:
  - Text Primary: #0f172a (Slate 900)
  - Text Secondary: #475569 (Slate 600)
  - Text Tertiary: #94a3b8 (Slate 400)
  - Border: #e2e8f0 (Slate 200)
  - Background: #f8fafc (Slate 50)

背景:
  - 主背景: 浅色渐变（从 slate-50 → white → indigo-50/30）
  - 卡片背景: 白色 + 轻微阴影
```

### 圆角系统
```css
按钮: 8px - 12px (矩形小圆角，禁止 full/pill)
卡片: 12px - 16px
输入框: 8px - 10px
徽章: 6px - 8px
```

### 间距系统
```css
Section 垂直间距: 80px - 120px (py-20 - py-32)
模块间距: 48px - 64px (mb-12 - mb-16)
卡片内边距: 24px - 32px (p-6 - p-8)
```

### 字体系统
```css
H1: 3xl - 6xl (48px - 72px), font-black
H2: 2xl - 4xl (32px - 48px), font-black
H3: xl - 2xl (24px - 32px), font-bold
Body: sm - base (14px - 16px), font-medium/normal
Caption: xs (12px), font-medium
```

---

## 📱 响应式断点

```css
Mobile: < 768px
  - 单列布局
  - Hero 标题下移
  - 工具区竖排
  - 卡片网格 2 列

Tablet: 768px - 1024px
  - 部分两列布局
  - 工具区横排（窄间距）
  - 卡片网格 3 列

Desktop: > 1024px
  - 完整两列/三列布局
  - Hero 左右布局
  - 工具区宽间距
  - 卡片网格 4 列
```

---

## ✅ SEO Checklist

### On-Page SEO
- [x] H1 包含主关键词 "Hairstyles for Men"
- [x] Meta Title: "Hairstyles for Men - AI 推荐男士发型 | Hairnova AI"
- [x] Meta Description: 包含关键词 + CTA（150-160字符）
- [x] URL 结构: 主页 `/` + 详情页 `/hairstyles-for-men/[slug]`
- [x] 图片 Alt 标签: 描述性文字 + 关键词
- [x] 内链: 15+ 相关发型链接
- [x] FAQ Schema（结构化数据）

### Content SEO
- [x] 关键词密度: 2-3%
- [x] 长尾词覆盖: 5+ 页面
- [x] 内容长度: 1500+ 字
- [x] 可读性: 短段落 + 列表 + 小标题
- [x] CTA 清晰: 每屏至少 1 个 CTA

### Technical SEO
- [x] SSG 静态生成
- [x] Mobile-first 设计
- [x] Core Web Vitals 优化
- [x] 语义化 HTML (semantic HTML)
- [x] 无障碍访问 (ARIA labels)

---

## 🚫 禁止事项

1. ❌ 不使用瀑布流布局（Masonry Layout）
2. ❌ 不使用胶囊形按钮（pill/rounded-full）
3. ❌ 首屏不出现女性内容/图片
4. ❌ 主 CTA 附近不出现女性相关文案
5. ❌ 不使用过于花哨的动画（保持专业）
6. ❌ 图片比例不统一（必须 3:4 或 1:1）
7. ❌ 不使用过小的点击区域（最小 44x44px）

---

## ✨ 优先级建议

### 高优先级（本周）
1. 确保所有男士发型图片替换为真实照片
2. 测试移动端体验（iPhone + Android）
3. 优化首屏加载速度（< 2s）
4. 添加 Schema.org 结构化数据

### 中优先级（本月）
5. A/B 测试不同 CTA 文案
6. 添加用户评价/社会证明
7. 补充剩余 10 个男士发型详情页
8. 集成 Google Analytics 事件追踪

### 低优先级（下月）
9. 多语言版本（英语/西班牙语）
10. 用户生成内容（UGC）功能
11. 会员系统/积分体系
12. 社交分享功能优化

---

**文档版本**: v1.0  
**最后更新**: 2026-01-20  
**设计师**: AI SEO + Product Design Specialist  
**状态**: ✅ 可上线（Ready for Production）
