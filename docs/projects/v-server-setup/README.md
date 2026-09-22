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
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Server Setup (V-Server)](#server-setup)
- [SSH Key Authentication](#ssh-key-authentication)
- [Disable Password Login](#disable-password-login)
- [NGINX Installation & Configuration](#nginx-installation-configuration)
- [Git Configuration on Server](#git-configuration-on-server)
- [GitHub SSH Access from Server](#github-ssh-access-from-server)
- [Testing & Validation Checklist](#testing-validation-checklist)
- [Security Considerations](#security-considerations)

---

## Project_Structure {#project-structure}

V-Server Setup/
├── README.md
└── checklist.pdf

---

## Prerequisites {#prerequisites}

- Linux V-Server (Ubuntu recommended)
- SSH access to the server
- Local machine with SSH installed
- SSH key pair generated locally
- Git installed locally and on server
- Sudo/root privileges


## Server_Setup_(V-Server) {#server-setup}

Update system:
```
sudo apt update && sudo apt upgrade -y
```

---

## SSH_Key_Authentication {#ssh-key-authentication}

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

## Disable_Password_Login {#disable-password-login}

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

## NGINX_Installation_&_Configuration {#nginx-installation-configuration}

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

<h1>Welcome to my V-Server 🚀</h1>
<p>NGINX is successfully running.</p>

Validate config:
```

nginx -t
```

Restart:
```

sudo systemctl restart nginx
```

Test in browser:

`http://<server-ip>`

---

## Git_Configuration_on_Server {#git-configuration-on-server}
```

git config --global user.name <Your Name>
git config --global user.email <your-email>@<example.com>
```

Verify:
```

git config --list
```

---

## GitHub_SSH_Access_from_Server {#github-ssh-access-from-server}

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

## Testing_&_Validation_Checklist {#testing-validation-checklist}

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

## Security_Considerations {#security-considerations}

- Password authentication disabled
- SSH key authentication enforced
- Only required ports open (22, 80)
- GitHub access via SSH keys
- Basic server hardening applied

---