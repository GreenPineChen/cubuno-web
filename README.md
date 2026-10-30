# cubuno.com

Cubuno 产品站（静态页）。分享水印 `cubuno.com` 点开应落到这里。

## 本地预览

```bash
cd cubuno-web
python3 -m http.server 8765 --bind 127.0.0.1
```

浏览器打开 <http://127.0.0.1:8765>

## 多语言（行业常见：默认英文 + 语言前缀）

| 语言 | 前缀 | 示例 |
| --- | --- | --- |
| English（默认） | 无 | `/`、`/privacy/`、`/terms/`、`/support.html` |
| 中文 | `/zh/` | `/zh/`、`/zh/privacy/`、`/zh/terms/`、`/zh/support.html` |

导航右上角语言选择器：切换后跳到对应语言的同页，并记住选择（回到英文首页时会跟到上次语言）。  
以后加韩文等：复制一套到 `/ko/...`，并在 `js/i18n.js` 与各页 `<select>` 里加 `ko` 即可。

App / 商店法律链接仍用英文正式版（`LegalUrls`）。

## 页面

| 路径 | 用途 |
| --- | --- |
| `/` | 落地首页（英文） |
| `/zh/` | 落地首页（中文） |
| `/privacy/` · `/zh/privacy/` | 隐私政策 |
| `/terms/` · `/zh/terms/` | 服务条款 |
| `/support.html` · `/zh/support.html` | 客服 / FAQ |

## 上线（GitHub Pages，与 pandobal.com 同套路）

本目录就是站点根（含 `index.html`）。不要把整个 Flutter 工程当成 Pages 根目录。

### 1. 新建仓库并上传

1. GitHub 仓库例如 `cubuno-web`（Public）。
2. 只把 **本目录内容** 推到仓库根。

### 2. 打开 GitHub Pages

1. 仓库 → **Settings → Pages**
2. Branch：`main` / `/ (root)`
3. Custom domain：`cubuno.com`（仓库内有 `CNAME`）
4. Enforce HTTPS

### 3. Cloudflare DNS

| Type | Name | Content | Proxy |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` 等 4 条 GitHub Pages IP | 灰云 |
| CNAME | `www` | `<用户名>.github.io` | 灰云 |

## 备注

- 商店下载：上架前首页为 App Store / Google Play「Coming soon」占位；上架后换成真实链接
- 法务主体仍是 Pandobal Limited；邮箱 `hello@pandobal.com`
