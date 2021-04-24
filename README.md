### aws

● 加入權限

```
chmod 400 [YOUR_KEY].pem
```

● 連線ＳＳＨ用戶端

```
ssh -i "your pem path/[your pem].pem" ec2-user@[your aws .com ]
```

```
安全群組
新增傳入規則
Elastic IPs
建立關聯
```

### mysql

<a href="https://www.tecmint.com/install-mysql-on-centos-8/">How to Install MySQL 8.0 on CentOS 8 / RHEL 8</a>

● 安裝

```
sudo yum -y install @mysql
```

● 開機自動開始

```
sudo systemctl start mysqld
sudo systemctl enable --now mysqld
sudo systemctl status mysqld
```

● 安全設定之後都是 yes

```
mysql_secure_installation
```

### Git

● 安裝 git

```
sudo yum install git
```

● 第一次 專案同步到 EC2

```
git clone [repository url] -b [branch name]
```

```
git add .
git commit -m ""
git push [repository url] [branch name]
```

### Linux

```
readlink -f [file name]
```

```
rm -rf [file or directory name]
```

```
netstat -anp | grep [port]
```

```
kill -9 [PID]
```

```
nohup [program command] [file path] &
```

### 安裝 python 應用程式

```
sudo yum install python3
```
