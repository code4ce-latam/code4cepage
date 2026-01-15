# Deploy Next.js en Linux con PM2 (Puerto 3000)

## Ubicación del proyecto

Ruta: `/var/www/code4ce/code4cepage`

---

## 1) Instalar dependencias y generar build de producción

```bash
cd /var/www/code4ce/code4cepage
npm ci
npm run build

## 2) Instalar dependencias y generar build de producción
pm2 start /usr/bin/node --name "code4cepage" --cwd /var/www/code4ce/code4cepage -- \
  node_modules/next/dist/bin/next start -p 3000 -H 0.0.0.0

## verificar si levanto en el puerto
pm2 status
sudo ss -lntp '( sport = :3000 )'
curl -I http://127.0.0.1:3000

## hacerlo persistente
pm2 save
pm2 startup
```

## publicacion en la web en code4ce.com

# Guía completa (copiar/pegar) — Publicar Next.js en code4ce.com con PM2 + Nginx + SSL (Let’s Encrypt)

> Objetivo: tener tu Next.js corriendo en el servidor con PM2 en el puerto 3000 (solo localhost), y exponerlo públicamente por Nginx en 80/443 con SSL gratis.

---

## 0) Variables / rutas usadas en este setup

- Proyecto: `/var/www/code4ce/code4cepage`
- App PM2: `code4cepage`
- Dominio: `code4ce.com` y `www.code4ce.com`
- Webroot Let’s Encrypt: `/var/www/letsencrypt`
- Node: `/usr/bin/node`

---

## 1) Verificar DNS (debe apuntar a la IP pública del servidor)

````bash
curl -4 ifconfig.me
dig +short code4ce.com A
dig +short www.code4ce.com A


## Verificar que esten apuntando los dns del dominio que apunten al hosting

## 1) Verificar DNS (debe apuntar a la IP pública del servidor)

```bash
curl -4 ifconfig.me
dig +short code4ce.com A
dig +short www.code4ce.com A


##Configurar Nginx (reverse proxy + challenge Let’s Encrypt)
## Crear webroot para challenge
sudo mkdir -p /var/www/letsencrypt/.well-known/acme-challenge
sudo chown -R www-data:www-data /var/www/letsencrypt


##Crear site Nginx
server {
  listen 80;
  server_name code4ce.com www.code4ce.com;

  # Let’s Encrypt challenge (NO redirigir)
  location ^~ /.well-known/acme-challenge/ {
    root /var/www/letsencrypt;
    default_type "text/plain";
    try_files $uri =404;
  }

  # Redirigir todo lo demás a HTTPS
  location / {
    return 301 https://$host$request_uri;
  }
}

server {
  listen 443 ssl http2;
  server_name code4ce.com www.code4ce.com;

  # Certificados (los generará Certbot)
  ssl_certificate     /etc/letsencrypt/live/code4ce.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/code4ce.com/privkey.pem;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}


## Habilitar site y recargar Nginx

echo ok | sudo tee /var/www/letsencrypt/.well-known/acme-challenge/ping
curl -i http://code4ce.com/.well-known/acme-challenge/ping
curl -i http://www.code4ce.com/.well-known/acme-challenge/ping


## Instalar Certbot (Let’s Encrypt) — recomendado por SNAP (evita conflictos de Python)

sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
certbot --version


##Emitir SSL gratis para code4ce.com y www (con redirect a HTTPS)

sudo certbot --nginx -d code4ce.com -d www.code4ce.com --redirect


## verficar
sudo nginx -t
sudo systemctl reload nginx
curl -I https://code4ce.com
curl -I https://www.code4ce.com


##Renovación automática (verificación)
sudo certbot renew --dry-run


## (Recomendado) Recargar Nginx cuando renueve:

sudo certbot renew --deploy-hook "systemctl reload nginx"


## Firewall recomendado (solo 80/443 públicos)

sudo ufw allow 'Nginx Full'
sudo ufw delete allow 3000/tcp 2>/dev/null || true
sudo ufw reload
sudo ufw status

## Comandos útiles
#Logs de la app:

pm2 logs code4cepage --lines 100

#Reiniciar app:
pm2 restart code4cepage

````
