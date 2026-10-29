# cubuno.com

Cubuno 产品站（静态页）。分享水印 `cubuno.com` 点开应落到这里。

## 本地预览

```bash
cd cubuno-web
python3 -m http.server 8787
```

浏览器打开 <http://127.0.0.1:8787>

## 页面

| 路径 | 用途 |
| --- | --- |
| `/` | 落地首页 |
| `/support.html` | 客服 / FAQ |
| 隐私 / 条款 | 仍指向 `pandobal.com/privacy`、`pandobal.com/terms`（与 App 内 LegalUrls 一致） |

## 上线（GitHub Pages，与 pandobal.com 同套路）

本目录就是站点根（含 `index.html`）。不要把整个 Flutter 工程当成 Pages 根目录。

### 1. 新建仓库并上传

1. GitHub 新建空仓库，例如 `cubuno-web`（Public；Private 需 GitHub Pro 才能用自定义域名 Pages）。
2. 只把 **本目录内容** 推到仓库根（不是推整个 `code/cubuno`）：

```bash
cd cubuno-web
git init
git add .
git commit -m "Initial Cubuno product site"
git branch -M main
git remote add origin git@github.com:<你的用户名>/cubuno-web.git
git push -u origin main
```

### 2. 打开 GitHub Pages

1. 仓库 → **Settings → Pages**
2. Source：Deploy from a branch
3. Branch：`main` / `/ (root)` → Save
4. **Custom domain** 填：`cubuno.com` → Save  
   （仓库里已有 `CNAME` 文件，内容为 `cubuno.com`）
5. 勾选 **Enforce HTTPS**（DNS 生效、证书签发后才可勾）

临时地址一般是：`https://<用户名>.github.io/cubuno-web/`  
绑自定义域名后以 `cubuno.com` 为准。

### 3. Cloudflare DNS（域名已在 CF 购买）

在 Cloudflare → 域名 `cubuno.com` → DNS，**不要改坏 pandobal.com 那几条**。

| Type | Name | Content | Proxy |
| --- | --- | --- | --- |
| CNAME | `www` | `<用户名>.github.io` | DNS only（灰云）建议先灰云 |
| CNAME | `@`（apex） | `<用户名>.github.io` | 灰云；CF 会做 CNAME flattening |

若 GitHub Pages 设置页要求 apex 用 A 记录，可改用官方 4 条 A（指向 GitHub Pages IP），与 pandobal 当时写法保持一致即可。

生效后打开：

- <https://cubuno.com>
- <https://cubuno.com/support.html>

### 和 pandobal.com 的关系

- 两套仓库、两套 Pages、两套 DNS，互不影响
- 限制主要是：免费账号 **Public** 仓库才能用自定义域名；每个仓库一个站点

## 备注

- 商店下载：上架前首页为 App Store / Google Play「Coming soon」占位；上架后把 `index.html` 里两个 `btn-store` 换成真实链接
- 法务主体仍是 Pandobal Limited；邮箱 `hello@pandobal.com`
- 之后若要把隐私页迁到 cubuno.com，需同步改 App 的 `LegalUrls`
