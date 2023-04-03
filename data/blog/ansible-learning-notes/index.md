---
path: "/ansible-learning-notes"
date: "2023-04-01"
title: "Ansible Learning Notes"
tags: [Ansible, বাংলা,ডেভঅপস, DevOps]
draft: false
summary: 'Ansible হচ্ছে একটি ওপেন সোর্স টুল যা দিয়ে IT অপারেশনের অনেক রিপেটেটিভ কাজকে অটোমেট করা যায়। ধরুন আপনি একজন ডেভঅপোস হিসেবে কাজ করছেন। এখন মাঝে মাঝেই আপনার নতুন নতুন কিছু সার্ভার তৈরি করতে হয়। এখন প্রতিবারই সেইম Nginx ইন্সটল করা, docker ইন্সটল করা, ইউজার তৈরি করা। এগুলো খুবই রিপেটেটিভ হয়ে যায়। এক্ষেত্রে আপনি Ansible ইউজ করতে পারেন।'

---

# Ansible learning
Ansible হচ্ছে একটি ওপেন সোর্স টুল যা দিয়ে IT অপারেশনের অনেক রিপেটেটিভ কাজকে অটোমেট করা যায়। ধরুন আপনি একজন ডেভঅপোস হিসেবে কাজ করছেন। এখন মাঝে মাঝেই আপনার নতুন নতুন কিছু সার্ভার তৈরি করতে হয়। এখন প্রতিবারই সেইম Nginx ইন্সটল করা, docker ইন্সটল করা, ইউজার তৈরি করা। এগুলো খুবই রিপেটেটিভ হয়ে যায়। এক্ষেত্রে আপনি Ansible ইউজ করতে পারেন। 

এখানে আমি মুলত টিউটোরিয়াল লিখিনি। Ansible শিখতে গিয়ে যেসকল জিনিস নোট করা প্রয়োজন মনে হয়েছে সেগুলোই লিখেছি। হয়তো আপনারও কাজে লাগতে পারে। 

## Learning metarials

Youtube playlist: https://www.youtube.com/playlist?list=PLT98CRl2KxKEUHie1m24-wkyHpEsa4Y70

Techworld Nana: https://www.youtube.com/watch?v=Wr8zAU-0uR4

KodeKloud: https://kodekloud.com/topic/playbook-run-options/

## Notes

Ansible-playbook রান করার সময় যেসকল অপশন বেশি ইউজ হয়ে থাকে:

```
--check  ==> dry run 
--start-at-task "start httpd service" ==> it will run specific task
--tags "kubernetes" ==> run all the tasks for this specific tag 
--skip-tags "kubernetes" ==> skip tasks specificed name
```

***ফাইল তৈরির জন্য সাধারণ প্লেবুক**

```yaml

- hosts: web1
  tasks:
    - name: Create /tmp/testfile.txt
      file:
        path: /tmp/testfile.txt
        state: touch
```

*** একটি ইউজার তৈরির প্লেবুক **

```yaml
- name: Create User on web1 Node
  hosts: web1
  become: true

  vars:
    username: angel1

  tasks:
    - name: Add User
      user:
        name: "{{ username }}"
        state: present
        createhome: yes
        shell: /bin/bash
        password_lock: yes
```

এখানে:

* become to true to elevate privileges to become a superuser, which is required to create a new user.
* The state field is set to "present" to ensure that the user is created if it doesn't already exist.
* The password_lock field is set to "yes" to lock the user's password and force them to change it on first login.



## ফ্যাক্ট (Fact)

ansible ফ্যাক্ট হচ্ছে হোস্ট কম্পিউটারের সিপিইউ,মেমরি,টাইম ইত্যাদি ইফরমেনশন কালেক্ট করে।

যদি ফ্যাক্ট দরকার না পরে তাহলে প্লেবুকে `gather-facts: no` করে দিলেই হবে। চাইলে এই `etc/ansible/ansible.cfg` এখানে gathering = implicit করে দিলে তাহলে আর ডিফল্ট ফ্যাক্ট রান করবে না। যদি দুই যায়গাতেই স্পেসিফাই করা থাকে তাহলে প্লেবুকে যেটা লেখা আছে ওইটার প্রাধান্য পাবে। Ansible এর `setup` মডিউলই হোস্টের ফ্যাক্টগুলো কালেক্ট করে থাকে।

**Host distribution name and version playbook**

```yaml
- name: Display distribution and version
  hosts: localhost
  gather_facts: yes
  tasks:
    - name: Show distribution and version
      debug:
        msg: "Distribution: {{ ansible_distribution }}, Version: {{ ansible_distribution_version }}"

```

এরকম আউটপুট আসবেঃ

```
TASK [Show distribution and version] ****************************************************************************************************
ok: [localhost] => {
    "msg": "Distribution: Ubuntu, Version: 20.04"
}
```

## Ansible Inventory

inventory হচ্ছে সকল হোস্টের আইপি,পাসওয়ার্ড,ইউজার নেম ইত্যাদি বলে দেওয়া থাকে। যেমনঃ

```
[webservers]
web1.example.com
web2.example.com
web3.example.com

[database_servers]
db1.example.com
db2.example.com
```

এছাড়া এভাবেও ইনভেন্টরি উল্লেখ করা যায়ঃ

```
web1 ansible_host=172.20.1.100 ansible_ssh_pass=Passw0rd ansible_user=roo
```

এখানে এটা হচ্ছে একটা ইনভেনটরি ফাইল। আমরা যদি এই ইনভেন্টরি ফাইল দিয়ে প্লেবুক রান করতে চাই তাহলে এরকম কমান্ড লিখতে হবেঃ

```
ansible-playbook -i inventory.ini my_playbook.yml
```

এছাড়াও প্লেবুকের মধ্যে আমরা চাইলে ইনভেন্টরি উল্লেখ করে দিতে পারি। যেমনঃ

```yaml
- name: Example playbook with explicit inventory
  hosts: webservers
  become: yes
  tasks:
    - name: Install Nginx
      apt:
        name: nginx
        state: latest
  vars:
    ansible_inventory: /path/to/inventory/file
```

যদি এভাবে উল্লেখ করে না দেই তাহলে `/etc/ansible/hosts` ডিরেক্টরিতে যে হোস্টগুলো উল্লেখ করা থাকবে ওইটাই ইউজ করবে।

#### Ansible configuration:

Ansible এর কনফিগারেশন ফাইলঃ `/etc/ansible/ansible.cfg`

```makefile

[defaults]
## All the defaults

[inventory]


[privilege_escalation]

[paramiko_connection]

[presistent_connection]

[colors]
```

বিভিন্ন প্লেবুকের ভেতরে কনফিগারেশন ফাইল রেখে ডিফাল্ট কনফিগারেশনকে ওভাররাইট করা যায়। যেমনঃ /opt/db-playbook/ansible.cfg এর ভেতরে একটা কনফিগারেশন রেখে দিলে ডিফাল্ট কনফিগারেশনকে ওভাররাইট করবে।

আবার $ANSIBLE_CONFIG=/opt/ansible-web.cfg এনভাইরমেন্ট ফাইলের মাধ্যমেও অন্য দ্যা ফ্লাই ওভাররাইট করা যায়। যেমনঃ `$ANSIBLE_CONFIG=ansible.cfg ansible-playbook playbook.yaml`

যেহুতু বিভিন্ন ভাবে ansible কনফিগার করা যায়। তাই কনফিগারেশনের অর্ডারটা হচ্ছে এরকমঃ

1. Enviroment variable ($ANSIBLE_CONFIG)
2. Inside the playbook directory (/opt/web-playbook/ansible.cfg)
3. User home directory .ansible file
4. Default configuration /etc/ansible/ansible.cfg

এটা হচ্ছে কনফিগারেশন লোড এর অর্ডার।

`> ansible-config list` এই কমান্ড দিয়ে জানা যাবে সকল কনফিগারেশন অপশনসমূহ।

`> ansible-config view` এটা মূলত বর্তমানে একটিভ কনফিগারেশন দেখাবে।

`> ansible-config dump` এটা বর্তমানে একটিভ কনফিগারেশন দেখাবে এবং কোন ফাইল থেকে কনিফগটা লোড করা হয়েছে সেটা দেখাবে।

## Adhoc commands

অনেক সময় আমাদের ডিবাগিং বা বিভিন্ন কিছু চেক করার ক্ষেত্রে কমান্ড ব্যাবহার করতে হয়। এ-ক্ষেত্রে প্রতিবার প্লেবুক লিখে লিখে রান করাটা সময় সাপেক্ষ ব্যাপার। তাই আমরা চাইলে এনসিবলের বিভিন্ন কমান্ড টার্মিনালে রান করে দেখতে পারি। এই রান করে দেখাটাই ad-hoc কমান্ড বলে। এই কমান্ড গুলো মাল্টিপল হোস্টে রান করা যায়। কিছু বহুল ব্যাবহৃত কমান্ডঃ (বেশিরভাগই সেল এক্সপ্লেমেন্টরি)

1. ansible all -m shell -a "uptime"
2. ansible all -m setup -a "filter=ansible_default_ipv4"
3. ansible all -m ping
4. ansible all -a 'cat /etc/hosts'

এখানে একটা ইন্টারেস্টিং ইউজ কেস হতে পারে। মাল্টিপল কমান্ড একসাথে চালানো। এক্ষেত্রে একটা শেল স্ক্রিপ্ট তৈরি করে আমরা চাইলে মাল্টিপল কমান্ড চালাতে পারি।


## Ansible Modules

***Package **
এটি মূলত কোন প্যাকেজ ইন্সটল/আনইন্সটল করার ক্ষেত্রে ব্যাবহার করা হয়।

```yaml
- name: Install Apache web server
  package:
    name: httpd
    state: present

- name: Remove Apache web server
  package:
    name: httpd
    state: absent
```

***Service**
সেইম এ্যাজ প্যাকেজ। কোন সার্ভিস এনাবল বা ডিজাবল এর ক্ষেত্রে ব্যাবাহার করা হয়। আবার চাইলে কোন প্যাকেজ ইন্সটলের পর সার্ভিস মডিউল ব্যাবহার করে এনাবল করে নিতে পারি। যেমনঃ

```yaml
- name: Install and start nginx web server
  hosts: webservers
  become: true

  tasks:
    - name: Install nginx package
      package:
        name: nginx
        state: present

    - name: Start nginx service
      service:
        name: nginx
        state: started
        enabled: yes
```

***Firewall**
এই মডিউল দিয়ে ফায়ারওয়াল ম্যানেজ করা টার্গেট হোস্টের। যেমনঃ

```yaml
- name: Allow incoming SSH traffic
  firewall:
    chain: input
    destination_port: 22
    protocol: tcp
    action: accept

```

Block:

```
- name: Block incoming HTTP traffic
  firewall:
    chain: input
    destination_port: 80
    protocol: tcp
    action: drop
```

```yaml
- name: Allow incoming traffic from specific IP addresses
  firewall:
    chain: input
    source: 192.0.2.0/24
    protocol: tcp
    destination_port: 22
    action: accept
```

```
- name: Delete a firewall rule
  firewall:
    chain: input
    protocol: tcp
    destination_port: 80
    state: absent
```

***Firewalld**
rule to allow incoming traffic on port 8080:

```
- name: Add firewalld rule to allow incoming traffic on port 8080
  firewalld:
    port: 8080/tcp
    permanent: yes // রিবুট করলে সেটিংস পারসিস্ট করবে
    state: enabled
    immediate: yes // permanent অপশন সাথে সাথে এ্যাপ্লাই করে না রিবুট না করলে। তাই ইমিডিয়েট ব্যাবহার করে সাথে সাথে এ্যাপ্লাই করা যায়। 
  become: true
```

rich rule to allow traffic from a specific IP address range:

```
 - name: Add firewalld rich rule to allow traffic from specific IP address range
  firewalld:
    rich_rule: 'rule family="ipv4" source address="192.168.1.0/24" accept'
    zone: public
    permanent: yes
    state: enabled
    immediate: yes
  become: true

```

***Cron**

```yaml
- name: Create a scheduled task using cron
  hosts: all
  become: yes
  vars:
    cron_job_command: /path/to/command
    cron_job_minute: "0"
    cron_job_hour: "5"
    cron_job_day: "*"
    cron_job_month: "*"
    cron_job_weekday: "*"
  tasks:
    - name: Add cron job
      cron:
        name: "my_cron_job"
        minute: "{{ cron_job_minute }}"
        hour: "{{ cron_job_hour }}"
        day: "{{ cron_job_day }}"
        month: "{{ cron_job_month }}"
        weekday: "{{ cron_job_weekday }}"
        job: "{{ cron_job_command }}"
        state: present

```

## Debug
অনেক সময় কোন স্পেসিফিক টাস্কের রেজাল্ট ডিবাগিং এর জন্য দেখতে হয়। তখন আমরা ডিবাগ মডিউল ব্যাবহার করতে পারি। যেমনঃ

```
- name: Check /etc/hosts file
  hosts: all
  tasks: 
   - shell: cat /etc/hosts
     register: result
   - debug:
       var: result
```

এখানে result ভেরিএবল এর মধ্যে পুরো আউটপুট থাকবে।

এছাড়া `-vvv` অথবা `-v` অপশনের মাধ্যমেও প্লেবুকের আউটপুট পাওয়া যায়।

```elixir

```



## Magic Variable

এক রকম ভেরিএবল যা `hostvars` নামেও পরিচিত। এটি অনেকেটা পিএইচপি এর __SERVase

* ansible_distribution_version
* ansible_architecture
* ansible_processor_vcpus
* ansible_processor_cores
* ansible_memtotal_mb
* ansible_date_time

সবগুলোই মোটামুটি সেলফ এক্সপ্লেনেটরি তাই আর এক্সপ্লেইন করলাম না। এগুলো ইউজ করতে চাইলে অবশ্যই দুই পাশে কার্লি ব্রাকেট দিয়ে ইউজ করতে হবে। যেমনঃ {{ ansible_port }}ER__, __FILE__  এর সাথেও তুলনা করা যায়। উদাহরণঃ `hostvars[webserver].dns_server`, এখানে webserver হোস্টের dns এ্যাড্রেস ইউজ করা হচ্ছে অন্য ম্যাজিক ভেরিয়াবলের মাধ্যমে।

এছাড়াও Ansible এর নিজস্ব কিছু ম্যাজিক ভেরিএবল আছে। যেমনঃ

* ansible_host
* ansible_port
* ansible_user
* ansible_connection
* ansible_python_interpreter
* inventory_hostname
* ansible_hostname
* ansible_os_family
* ansible_distribution
* ansible_distribution_rele

## Jinja2

এটা মূলত একটা টেমপ্লেটিং ইঞ্জিন, পাইথন ল্যাংগুয়েজের জন্য। অনেকটা Blade, Twig, Handlebars, Mustache, Amber, Haml ইত্যাদির মত।

Ansible যেহুতু পাইথনে লেখা তাই এখানেও jinja2 টেমপ্লেটিং ইউজ করেছে।

বিলট ইন ফিল্টারগুলো এখানে পাওয়া যাবেঃ https://jinja.palletsprojects.com/en/3.1.x/templates/#list-of-builtin-filters

Ansible-এ কিছু স্পেশাল ফিল্টার আছে সেগুলো হলঃ

## Directory structure

এরকম ভাবে রাখলে অর্গানাইজড ভাবে রাখা যায়।

```
ansible/
├── inventories/
│   ├── production/
│   │   ├── hosts
│   │   └── group_vars/
│   └── staging/
│       ├── hosts
│       └── group_vars/
├── roles/
│   ├── common/
│   │   ├── tasks/
│   │   │   └── main.yml
│   │   └── vars/
│   │       └── main.yml
│   ├── webserver/
│   │   ├── tasks/
│   │   │   └── main.yml
│   │   └── templates/
│   │       └── nginx.conf.j2
│   └── database/
│       ├── tasks/
│       │   └── main.yml
│       ├── templates/
│       │   └── my.cnf.j2
│       └── vars/
│           └── main.yml
├── playbooks/
│   ├── webserver.yml
│   ├── database.yml
│   ├── common.yml
│   └── site.yml
├── ansible.cfg
└── requirements.yml
```

<!-- livebook:{"break_markdown":true} -->

প্লেবুকের উদাহরনঃ

```yaml
---
- name: Configure web server
  hosts: webservers
  become: yes
  roles:
    - common
    - webserver

```

কোন প্লেবুকের মধ্যে থেকে `include_task` দিয়ে অন্য প্লেবুকের টাস্ক-কে ইনক্লুড করা যায়। এক্ষেত্রে ডুপ্লিকেসি কমে। যেমনঃ

```
---
- name: Deploy web application
  hosts: web_servers
  vars:
    env: "{{ lookup('env', 'ENVIRONMENT') }}" # Get the environment variable value
  tasks:
    - name: Install required packages
      yum:
        name:
          - httpd
          - php
          - php-mysql
        state: latest

    # Include tasks for setting up SSL certificates if environment is production
    - include_tasks: ssl_setup.yml
      when: env == 'production'

  handlers:
    - name: restart Apache
      service:
        name: httpd
        state: restarted
```

## Roles

আমরা যখন কোন সার্ভার তৈড়ী করি তখন ওই সার্ভারটির কোন না কোন উদ্দেশ্য থাকে। যেমন, ডেটাবেজ সার্ভার, এ্যাপ্লিকেশন সার্ভার, স্ট্যাটিক ফাইল সার্ভার, কিউ সার্ভার, রেডিস/ক্যাশ সার্ভার ইত্যাদি।

এই যে বিভিন্ন টাইপের/ধরনের সার্ভার আমরা তৈড়ী করছি এটিই একেকটা রোল।

ফর এক্সাম্পল, একটা PHP এ্যাপ্লিকেশন সার্ভার তৈরি করতে আমাদের Nginx, PHP ইন্সটল করতে হবে। তারপর কনফিগার করতে হবে। এটাই যাতে আমারা সহজে করতে পারি বার বার রিপেটেটিভ না হয়।

তাহলে আমরা রোল বলতে বুঝলাম, কোন স্পেসিফিক সার্ভার তৈরি করতে যা যা দরকার, যেমম, টাস্ক, ভেরিএবল, টেম্পলেট ইত্যাদিই হচ্ছে একটা রোল।

যেমন `webapp` রোলের জন্য আমরা এরকম ডিরেক্টরি স্ট্রাকচার রাখতে পারিঃ

```
roles/
└── webapp/
    ├── tasks/
    │   ├── main.yml
    │   └── configure.yml
    ├── files/
    │   ├── config.ini
    │   └── app_settings.yml
    ├── templates/
    │   └── nginx.conf.j2
    ├── vars/
    │   ├── main.yml
    │   └── webapp.yml
    ├── defaults/
    │   └── main.yml
    └── README.md
```

Example of task `tasks/main.yaml` file:

```yaml
- name: Configure web application
  include_tasks: configure.yml
```

Example of `tasks/configure.yaml` file:

```yaml
---
- name: Copy web application files
  copy:
    src: /path/to/webapp
    dest: /var/www/html
  become: true

- name: Generate configuration file from template
  template:
    src: nginx.conf.j2
    dest: /etc/nginx/conf.d/webapp.conf
  become: true
  notify: restart Nginx

- name: Start web application service
  service:
    name: webapp
    state: started
  become: true

- name: Set firewall rule for web application
  ufw:
    rule: allow
    port: 80/tcp
  become: true

```

## Ansible Galaxy:

বিভিন্ন রকমের রোল অনলাইনে পেতেঃ https://galaxy.ansible.com 
এটা অনেকটা ডকারহাবের মত। বিভিন্ন রকমের হাজার হাজার রোল এখানে পাওয়া যায়।

যেমন, আমি mysql রোল ব্যাবহার করতে চাই। এক্ষেত্রেঃ `ansible-galaxy init mysql` কমান্ড লিখে দিলেই প্রয়োজনীয় ডিরেক্টরি তৈরি করে দিবে। যেমন,

```
mysql/
├── README.md
├── defaults
│   └── main.yml
├── files
├── handlers
│   └── main.yml
├── meta
│   └── main.yml
├── tasks
│   ├── main.yml
│   ├── mysql_config.yml
│   ├── mysql_install.yml
│   └── mysql_service.yml
├── templates
├── tests
│   ├── inventory
│   └── test.yml
└── vars
    └── main.yml

```

এখানেঃ

* `README.md`: Contains documentation for the role.
* `defaults/main.yml`: Contains default values for variables used in the role.
* `handlers/main.yml`: Contains handlers used in the role, such as restarting services.
* `meta/main.yml`: Contains metadata for the role, such as the author and description.
* `tasks/main.yml`: Contains the main tasks file for the role, which includes other task files such as mysql_install.yml, mysql_config.yml, and mysql_service.yml. These tasks define the steps required to install, configure, and start the MySQL service.
* `templates/`: Contains Jinja2 templates used to generate configuration files dynamically.
* `tests/`: Contains test files used to validate the role.
  vars/main.yml: Contains variable files used in the role.

এখন যদি আমি এই রোল ব্যাবহার করতে চাই তাহলে প্লেবুকের ভেতরে `roles: - mysql` বলে দিলেই হবে। যেমন,

my-playbook.yml

```yaml
- name: Install and configure MySQL
  hosts: db-server
  roles:
    - mysql
```

যখন আমরা প্লেবুক রান করবো তখন Ansible প্লেবুকের ডিরেক্টরির ভেতরে `roles` নামে ডিরেক্টরি খুঁজবে। না পেলে `/etc/ansible/roles` এখানে খুঁজবে। অথবা `ansible.cfg` ফাইলে `roles_path = /etc/ansible/roles` মডিফাই করেও ডিফল্ট  ডিরেক্টরি পয়েন্ট করে দেওয়া যায়।

আর যদি `Ansible Galaxy` থেকে কোন রোল ইউজ করতে চাই তাহলেঃ

`> ansible-galaxy install geerlinggy.mysql` 
কমান্ড দিলেই গ্যালাক্সি থেকে কোন রোল ডাউনলোড হয়ে ইন্সটল হয়ে যাবে।

## Vault

নামেই বোঝা যাচ্ছে এটি মূলত এনক্রিপশনেড় কাজে ব্যাবহার করা হয়। আমরা অনেক সময় এর আগের উদাহরণগুলতে আমরা Plain Text-এ ডাটাবেজ, সার্ভার ইত্যাদির ক্রেডেনশিয়াল রেখেছি। plain text-এ এভাবে পাসওয়ার্ড রাখা সিকিউরড না। তাই ভল্ট ব্যবহার করে এনক্রিপ্টেড আকারে রাখা হয়।

যেমনঃ `var/secrets.yml`

```
db_password: mysecrectpassword
```

এখন এটি ভল্টের মাধ্যমে এনক্রিপ্ট করতে পারিঃ `> ansible-vault encrypt vars/secrets.yml`। এখন রান করলে ভল্টের পাসওয়ার্ড চাইবে, এটি কিন্তু ফাইলের ভেতরে যে পাসওয়ার্ড দেওয়া আছে সেটি না। ভল্ট পাসওয়ার্ড হচ্ছে এই ফাইল ডিক্রিপ্ট করতে একটা পাসোওয়ার্ড।

এরপর এনক্রিপ্টেড ফাইলটি প্লেবুকে ব্যাবহার করতেঃ

```yaml
- name: Set MySQL root password
  mysql_user:
    name: root
    password: "{{ db_password }}"
    login_password: "{{ db_password }}"
  become: true

```

এবার প্লেবুক রান করতেঃ `> ansible-playbook myplaybook.yml --ask-vault-pass`।

বার বার ভল্ট পাসওয়ার্ড যদি দিতে বিরক্ত লাগে তাহলে একটা ফাইলে রেখেও রান করা যায়। যেমন, `vault-password.txt`

```
myvaultpassword
```

এবার রান করতে হবে এভাবেঃ `> ansible-playbook myplaybook.yml --vault-password-file vault-password.txt
`

এখন প্রশ্ন হচ্ছে, এভাবে ভল্ট পাসওয়ার্ড প্লেয়িং টেক্সটে রাখা কি সিকিউর?

উত্তর হচ্ছেঃ না!

তাহলে? 
এবার বিষয়টা একটু কমপ্লিকেটেড। --vault-password-file এর প্যারামিটারে আমরা পাইথন ফাইল ব্যাবহার করতে পারি। তখন এটাকে পাইথন স্ক্রিপ্ট দিয়ে কোন API কল করে, বা ডাটাবেজে বা কোন পাসওয়ার্ড ম্যানেজার ব্যাবহার করতে পারি। যেমম, AWS Key Management service (KMS) অথবা HasiCorp Vault.

এছাড়া যেসকল কমান্ড রয়েছেঃ 
`> ansible-vault view vars/secret.yaml`

`> ansible-vault create vars/secret.yaml`

কমান্ড গুলো সেলফ এক্সপ্লেমেন্টরি তাই আর বিস্তারিত লিখলাম না।
