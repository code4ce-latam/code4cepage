# Guía de Despliegue en Hetzner

Guía paso a paso para desplegar la aplicación Next.js en un servidor Linux de Hetzner.

## Requisitos Previos

- Servidor Linux en Hetzner (Ubuntu 20.04/22.04 recomendado)
- Acceso SSH al servidor
- Dominio configurado apuntando al servidor (code4ce.com)
- Node.js 18+ instalado

## 1. Preparación del Servidor

### Conectarse al servidor

```bash
ssh root@tu-servidor-ip
```

### Actualizar el sistema

```bash
apt update && apt upgrade -y
```

### Instalar Node.js 20.x

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node --version  # Verificar que sea v20.x
npm --version
```

### Instalar herramientas adicionales

```bash
apt install -y git nginx certbot python3-certbot-nginx
```

## 2. Configurar Usuario y Permisos

### Crear usuario para la aplicación (opcional pero recomendado)

```bash
adduser code4ce
usermod -aG sudo code4ce
su - code4ce
```

## 3. Clonar el Repositorio

```bash
cd /home/code4ce  # o el directorio que prefieras
git clone https://github.com/code4ce-latam/code4cepage.git
cd code4cepage
```

## 4. Instalar Dependencias

```bash
npm install
```

## 5. Configurar Variables de Entorno

```bash
nano .env.local
```

Agregar:

```env
RESEND_API_KEY=tu_api_key_de_resend
NODE_ENV=production
```

Guardar con `Ctrl+O`, `Enter`, `Ctrl+X`

## 6. Build de Producción

```bash
npm run build
```

## 7. Instalar PM2 (Process Manager)

```bash
npm install -g pm2
```

## 8. Configurar PM2

Crear archivo de configuración:

```bash
nano ecosystem.config.js
```

Contenido:

```javascript
module.exports = {
  apps: [
    {
      name: "code4ce",
      script: "npm",
      args: "start",
      cwd: "/home/code4ce/code4cepage",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
```

Iniciar la aplicación:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Seguir las instrucciones que aparecen
```

## 9. Configurar Nginx como Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/code4ce
```

Contenido:

```nginx
server {
    listen 80;
    server_name code4ce.com www.code4ce.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Habilitar el sitio:

```bash
sudo ln -s /etc/nginx/sites-available/code4ce /etc/nginx/sites-enabled/
sudo nginx -t  # Verificar configuración
sudo systemctl restart nginx
```

## 10. Configurar SSL con Let's Encrypt

```bash
sudo certbot --nginx -d code4ce.com -d www.code4ce.com
```

Seguir las instrucciones del asistente. Certbot actualizará automáticamente la configuración de Nginx.

## 11. Configurar Firewall

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

## 12. Verificar que Todo Funciona

```bash
pm2 status
pm2 logs code4ce
sudo systemctl status nginx
```

## Comandos Útiles para Mantenimiento

### Ver logs de la aplicación

```bash
pm2 logs code4ce
```

### Reiniciar la aplicación

```bash
pm2 restart code4ce
```

### Actualizar el código

```bash
cd /home/code4ce/code4cepage
git pull
npm install
npm run build
pm2 restart code4ce
```

### Ver estado de PM2

```bash
pm2 status
pm2 monit
```

### Reiniciar Nginx

```bash
sudo systemctl restart nginx
```

## Troubleshooting

### La aplicación no inicia

```bash
pm2 logs code4ce --lines 50
```

### Error de permisos

```bash
sudo chown -R code4ce:code4ce /home/code4ce/code4cepage
```

### Puerto 3000 en uso

```bash
lsof -i :3000
kill -9 <PID>
```

### Verificar que Nginx está funcionando

```bash
sudo systemctl status nginx
sudo nginx -t
```

## Notas Importantes

- Asegúrate de que el dominio `code4ce.com` apunte al IP de tu servidor Hetzner
- Verifica que los registros DNS de Resend estén configurados correctamente
- El archivo `.env.local` debe contener `RESEND_API_KEY` para que el formulario funcione
- PM2 mantendrá la aplicación corriendo incluso después de reiniciar el servidor
