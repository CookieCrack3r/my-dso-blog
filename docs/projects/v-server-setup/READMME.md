# V-Server Setup Documentation_new

## Table of Contents
- [Overview]([https://www.markdownguide.org/extended-syntax](https://github.com/CookieCrack3r/my-dso-blog/edit/setup-blog/docs/projects/v-server-setup/READMME.md)#Overview))
- Project Structure
- Prerequisites
- Server Setup (V-Server)
- SSH Key Authentication
- Disable Password Login
- NGINX Installation & Configuration
- Git Configuration on Server
- GitHub SSH Access from Server
- Testing & Validation
- Security Considerations
- Checklist (Assignment Requirements)
- Extras / Notes
- Loom Video

---

## Overview

This repository documents the setup and configuration of a secure V-Server environment.

Focus areas:
- Secure SSH authentication
- NGINX web server setup
- Git & GitHub integration via SSH
- Basic server hardening

This documentation is part of a Docusaurus repository and is located under:

V-Server Setup/README.md

---

## Project Structure

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

---

## Server Setup (V-Server)

Update system:

sudo apt update && sudo apt upgrade -y

---

## SSH Key Authentication

Generate SSH key (local machine):

ssh-keygen -t ed25519 -C "your-email@example.com"

Copy SSH key to server:

ssh-copy-id user@server-ip

Test login:

ssh user@server-ip

---

## Disable Password Login

Only after SSH key login works.

Edit SSH config:

sudo nano /etc/ssh/sshd_config

Set:

PasswordAuthentication no

Restart SSH:

sudo systemctl restart ssh

Test:

ssh -o PubKeyAuthentication=no user@server-ip

Expected: Access denied

---

## NGINX Installation & Configuration

Install NGINX:

sudo apt install nginx -y

Start and enable service:

sudo systemctl start nginx
sudo systemctl enable nginx

Create custom page:

sudo nano /var/www/html/index.html

Example:

<h1>Welcome to my V-Server 🚀</h1>
<p>NGINX is successfully running.</p>

Validate config:

nginx -t

Restart:

sudo systemctl restart nginx

Test in browser:

http://<server-ip>

---

## Git Configuration on Server

git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

Verify:

git config --list

---

## GitHub SSH Access from Server

Generate SSH key on server:

ssh-keygen -t ed25519 -C "server-email@example.com"

Show public key:

cat ~/.ssh/id_ed25519.pub

Add to GitHub:
Settings → SSH and GPG keys

Test connection:

ssh -T git@github.com

Expected:

Hi username! You've successfully authenticated...

---

## Testing & Validation Checklist

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

## Security Considerations

- Password authentication disabled
- SSH key authentication enforced
- Only required ports open (22, 80)
- GitHub access via SSH keys
- Basic server hardening applied

---

## Checklist (Assignment Requirements)

All requirements fulfilled:

- SSH key authentication setup
- Password login disabled
- NGINX installed and configured
- Custom landing page deployed
- Git configured on server
- GitHub SSH access configured
- Documentation written in Markdown
- Feature branch + PR created
- checklist.pdf included
- Loom video created

---

## Extras / Notes

- NGINX configuration validated using nginx -t
- Separate SSH key used for GitHub server access
- Basic server security hardening applied

---

## Loom Video

A short Loom video (max 5 minutes) demonstrates:
- SSH login via key
- NGINX setup
- Web page deployment
- Git & GitHub SSH setup
- Security configuration
