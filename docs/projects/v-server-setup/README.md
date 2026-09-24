# <h1>V-Server Setup</h1>

This repository documents the setup and configuration of a secure V-Server environment.

Focus areas:
- Secure SSH authentication
- NGINX web server setup
- Git & GitHub integration via SSH
- Basic server hardening

This documentation is part of a Docusaurus repository and is located under:

V-Server Setup/README.md

---

## Table of Contents
- [Project_Structure](#project_structure)
- [Prerequisites](#prerequisites)
- [Server_Setup_(V-Server)](#server_setup_v-server)
- [SSH_Key_Authentication](#ssh_key_authentication)
- [Disable_Password_Login](#disable_password_login)
- [NGINX_Installation_&_Configuration](#nginx_installation__configuration)
- [Git_Configuration_on_Server](#git_configuration_on_server)
- [GitHub_SSH_Access_from_Server](#github_ssh_access_from_server)
- [Testing_&_Validation_Checklist](#testing__validation_checklist)
- [Security_Considerations](#security_considerations)

---

## Project_Structure

V-Server Setup/
├── README.md
└── checklist.pdf

---

## Prerequisites

- Linux V-Server (Ubuntu recommended)
- SSH access to the server
- Local machine with SSH installed
- SSH key pair generated locally
- Git installed locally and on server
- Sudo/root privileges


## Server_Setup_(V-Server)

Update system:
```
sudo apt update && sudo apt upgrade -y
```

---

## SSH_Key_Authentication

Generate SSH key (local machine):
```

ssh-keygen -t ed25519 -C <your-email@example.com>
```

Copy SSH key to server:
```

ssh-copy-id <user>@<server-ip>
```

Test login:
```

ssh <user>@<server-ip>
```

---

## Disable_Password_Login

Only after SSH key login works.

Edit SSH config:
```

sudo nano /etc/ssh/sshd_config
```

Set:

PasswordAuthentication no

Restart SSH:
```

sudo systemctl restart ssh
```

Test:
```

ssh -o PubKeyAuthentication=no <user>@<server-ip>
```

Expected: Access denied

---

## NGINX_Installation_&_Configuration

Install NGINX:
```

sudo apt install nginx -y
```

Start and enable service:
```

sudo systemctl start nginx
sudo systemctl enable nginx
```

Create custom page:
```

sudo nano /var/www/html/index.html
```

Example:

```html
<h1>Welcome to my V-Server 🚀</h1>
<p>NGINX is successfully running.</p>
```

Validate config:
```

nginx -t
```

Restart:
```

sudo systemctl restart nginx
```

Test in browser:

```
http://<server-ip>
```

---

## Git_Configuration_on_Server
```

git config --global user.name <Your Name>
git config --global user.email <your-email>@<example.com>
```

Verify:
```

git config --list
```

---

## GitHub_SSH_Access_from_Server

Generate SSH key on server:
```

ssh-keygen -t ed25519 -C <server-email>@<example.com>
```

Show public key:
```

cat ~/.ssh/id_ed25519.pub
```

Add to GitHub:
Settings → SSH and GPG keys

Test connection:
```

ssh -T git@github.com
```

Expected:

Hi username! You've successfully authenticated...

---

## Testing_&_Validation_Checklist

- SSH login works via key authentication
- Password login disabled
- NGINX installed and running
- Custom HTML page reachable in browser
- nginx -t passes without errors
- Git configured on server
- GitHub SSH connection works
- Feature branch + PR created
- Documentation placed correctly
- checklist.pdf included

---

## Security_Considerations

- Password authentication disabled
- SSH key authentication enforced
- Only required ports open (22, 80)
- GitHub access via SSH keys
- Basic server hardening applied

---