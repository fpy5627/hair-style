# 长尾词落地页系统 (Hairstyles for Men)

## 📁 文件结构

```
src/
├── data/
│   └── hairstyles-men.ts          # 发型数据文件
├── app/[locale]/(default)/
│   └── hairstyles-for-men/
│       └── [slug]/
│           └── page.tsx            # 动态路由页面
```

---

## 🎯 已创建的 5 个长尾词页面

1. **Buzz Cut** - `/hairstyles-for-men/buzz-cut`
2. **Fade** - `/hairstyles-for-men/fade`
3. **Pompadour** - `/hairstyles-for-men/pompadour`
4. **Undercut** - `/hairstyles-for-men/undercut`
5. **Side Part** - `/hairstyles-for-men/side-part`

---

## 📊 每个页面包含的模块

### 1. SEO 元数据
- ✅ 自定义 title（如 "Buzz Cut for Men - AI Hairstyle Recommendation"）
- ✅ 自定义 description（含关键词）
- ✅ OpenGraph 标签
- ✅ Keywords

### 2. H1 标题
```
{Hairstyle Name} – AI Recommendation Based on Face Shape
```

### 3. Intro 简介
- 英文简介（SEO 友好）
- 中文简介

### 4. Upload CTA
- 上传照片按钮
- AI 分析说明
- 立即试戴功能

### 5. AI 推荐模块
- ✅ 适合的脸型（绿色）
- ⚠️ 不适合的脸型（红色）
- 发型特性：难度/维护/风格

### 6. FAQ 模块
每个发型 3 个专属问题：
- Does this fit {face shape}?
- Is it good for thin hair?
- Will AI change my face?

### 7. Internal Links
- 相关发型链接（横向推荐）
- 按脸型浏览链接

### 8. Bottom CTA
- 最终转化按钮
- 引导用户上传照片试戴

---

## 🔧 如何添加新发型

### 步骤 1: 编辑数据文件
打开 `src/data/hairstyles-men.ts`，在 `HAIRSTYLES_MEN_DATA` 数组中添加新对象：

```typescript
{
  slug: 'crew-cut',  // URL slug
  name: 'Crew Cut',
  nameZh: '平头',
  metaTitle: 'Crew Cut for Men - AI Face Shape Analysis | Hairnova AI',
  metaDescription: '...',
  h1: 'Crew Cut – AI Recommendation Based on Face Shape',
  intro: '...',
  introZh: '...',
  suitableFaceShapes: ['Oval', 'Square'],
  notSuitableFaceShapes: ['Long'],
  features: {
    difficulty: 'Easy',
    maintenance: 'Low',
    style: 'Military / Clean'
  },
  faqs: [
    {
      question: 'Does Crew Cut fit round face?',
      answer: '...'
    }
    // ... 添加 2-3 个 FAQ
  ],
  relatedHairstyles: ['buzz-cut', 'fade', 'side-part'],
  imageUrl: 'https://...',
  exampleImages: ['...']
}
```

### 步骤 2: 更新主页内链
打开 `src/app/[locale]/(default)/page.tsx`，在热门发型列表中添加：

```typescript
{ name: 'Crew Cut', slug: 'crew-cut', hasPage: true }
```

### 步骤 3: 自动生成页面
Next.js 会自动生成新的静态页面（SSG）。

---

## 🌐 URL 结构

```
主页: /
  ├── Hero（H1: Hairstyles for Men）
  ├── 工具体验区
  ├── 发型库
  ├── FAQ
  └── SEO 内链区
       ├── Buzz Cut → /hairstyles-for-men/buzz-cut
       ├── Fade → /hairstyles-for-men/fade
       ├── Pompadour → /hairstyles-for-men/pompadour
       ├── Undercut → /hairstyles-for-men/undercut
       └── Side Part → /hairstyles-for-men/side-part

详情页: /hairstyles-for-men/{slug}
  ├── H1: {Name} – AI Recommendation
  ├── Intro
  ├── Upload CTA
  ├── AI 推荐（适合/不适合脸型）
  ├── FAQ（3个问题）
  ├── Related Hairstyles（横向推荐）
  └── Bottom CTA
```

---

## 📈 SEO 优化策略

### 1. 关键词覆盖
- 主页：`hairstyles for men`（主关键词）
- 详情页：`buzz cut for men`, `fade haircut men`（长尾词）

### 2. 内链架构
```
主页（权重最高）
  ↓
长尾词页面（接收权重）
  ↓
横向推荐（权重流动）
```

### 3. 用户意图匹配
- **信息搜索**：FAQ 回答具体问题
- **比较搜索**：Related Hairstyles 提供对比
- **转化搜索**：Upload CTA 引导试戴

---

## 🚀 后续扩展建议

### 短期（1周内）
- [ ] 添加 10 个热门男士发型
- [ ] 添加真实男士头像示例图片
- [ ] 优化移动端布局

### 中期（1月内）
- [ ] 创建女士发型系列 `/hairstyles-for-women/{slug}`
- [ ] 创建脸型系列 `/face-shape/{slug}/hairstyles`
- [ ] 添加用户评论/评分功能

### 长期（3月内）
- [ ] 结构化数据（Schema.org）
- [ ] 多语言版本（en/zh/es/fr）
- [ ] 动态生成 OG 图片

---

## ✅ 测试清单

- [ ] 访问 `/hairstyles-for-men/buzz-cut` 确认页面正常
- [ ] 检查页面 title 和 description
- [ ] 测试 Upload 功能跳转
- [ ] 验证 FAQ 展开/折叠
- [ ] 测试 Related Hairstyles 链接
- [ ] 移动端响应式检查
- [ ] 主页内链点击测试

---

## 📞 技术支持

如需添加更多发型或修改模板，请参考：
- 数据文件：`src/data/hairstyles-men.ts`
- 页面模板：`src/app/[locale]/(default)/hairstyles-for-men/[slug]/page.tsx`
