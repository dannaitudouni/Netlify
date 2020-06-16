---
title: OPENWRT编译之树莓派4B
date: 2020-6-16
tags:
 - VuePress
 - Blog
categories:
 - openwrt
---

## 基本说明

>转自：<http://leux.cn/doc/OPENWRT%E7%BC%96%E8%AF%91%E4%B9%8B%E6%A0%91%E8%8E%93%E6%B4%BE4B.html>
>适用硬件： 树莓派4B
>编译系统： Ubuntu 18 LTS
## 安装编译工具
```
sudo apt-get update
sudo apt-get install build-essential asciidoc binutils bzip2 \
gawk gettext git libncurses5-dev libz-dev patch unzip zlib1g-dev \
lib32gcc1 libc6-dev-i386 subversion flex uglifyjs libssl-dev upx \
gcc-multilib p7zip p7zip-full msmtp texinfo libglib2.0-dev xmlto \
git-core qemu-utils libelf-dev autoconf automake libtool autopoint \
curl wget device-tree-compiler rsync
```


## 获取编译源码
```
# 设置代理来加速源码下载，没有代理可跳过或根据需求设置
# export all_proxy="127.0.0.1:7890"

# 获取openwrt官方源码
mkdir openwrt
cd openwrt/
git clone https://git.openwrt.org/openwrt/openwrt.git ./

# 以后每次编译前建议执行以下三行命令更新源码
git pull
./scripts/feeds update -a
./scripts/feeds install -a

make defconfig		# 测试编译环境
make menuconfig		# 进入固件配置界面
make download -j8 V=s	# 下载所需源码，请尽量使用梯子
make -j1 V=s		# 首次编译推荐用单线程

# 再次编译前建议使用make clean清理
make clean	# 清除bin目录
make dirclean	# 清除bin目录和交叉编译工具及工具链目录
make distclean	# 清除所有相关的东西，包括下载的软件包，配置文件，feed内容等
```

## 树莓派4B编译选项

>*可选内核配置*
```
# 额外配置内核参数，一般不需要配置
# 只能包含到内核而不能作为模块，因为编译后的模块不会添加到固件内
make kernel_menuconfig	# 进入内核配置界面

# 打开KVM支持：Virtualization > Kernel-based Virtual Machine support
# 修改的内核参数会保存到openwrt/target/linux/bcm27xx/bcm2711/config-5.4
# 和openwrt/target/linux/generic/config-5.4合成最终内核配置文件
# openwrt/build_dir/target-aarch64_cortex-a72_musllinux-bcm27xx_bcm2711/linux-5.4.42/.config

```

>*固件编译配置*
```
make menuconfig参数配置
# 必选配置
Target System -> Broadcom BCM27xx
Subtarget -> BCM2711 boards (64 bit)
Target Profile -> Raspberry Pi 4B

# 镜像参数
Target Images -> ext4		# ext4格式的固件可方便地调整分区大小
Target Images -> squashfs	# squashfs格式的固件可恢复出厂设置
Target Images -> Kernel partition size = 64		# boot分区大小为64M
Target Images -> Root filesystem partition size = 512	# root分区大小为512M

# 可选工具
Base system -> block-mount	# 在LuCI界面添加<挂载点>菜单
Base system -> blockd		# 自动挂载设备
Base system -> wireless-tools	# 无线扩展工具
Administration -> htop		# 添加htop命令
Firmware -> xxx			# 选择你需要的网卡固件，默认即可
```

>*内核模块*
```
# 文件系统
Kernel modules -> Filesystems -> kmod-fs-ext4
Kernel modules -> Filesystems -> kmod-fs-ntfs
Kernel modules -> Filesystems -> kmod-fs-squashfs
Kernel modules -> Filesystems -> kmod-fs-vfat
Kernel modules -> Filesystems -> kmod-fuse

# 网卡支持
Kernel modules -> Network Devices -> kmod-xxx	# 有线网卡支持，跟以下几项可根据需求选择性添加
Kernel modules -> Wireless Drivers -> kmod-rt2800-usb			# 添加Ralink RT5370芯片的USB无线网卡驱动
Kernel modules -> USB Support -> kmod-usb-net -> kmod-usb-net-sr9700	# 添加USB2.0的有线网卡SR9700芯片支持
Kernel modules -> USB Support -> kmod-usb-net -> kmod-usb-net-rtl8152	# 添加USB2/3的有线网卡RTL8152/3芯片支持
Kernel modules -> USB Support -> kmod-usb-net -> kmod-usb-net-asix	# 添加支持亚信的有线网卡支持
Kernel modules -> USB Support -> kmod-usb-net -> kmod-usb-net-asix-ax88179  # 添加USB3.0的有线网卡芯片AX88179的驱动

# USB支持
Kernel modules -> USB Support -> kmod-usb-core		# 启用USB支持
Kernel modules -> USB Support -> kmod-usb-hid		# USB键鼠支持
Kernel modules -> USB Support -> kmod-usb-ohci		# 添加OHCI支持
Kernel modules -> USB Support -> kmod-usb-uhci		# 添加UHCI支持
Kernel modules -> USB Support -> kmod-usb-storage	# 启用USB存储
Kernel modules -> USB Support -> kmod-usb-storage-extras
Kernel modules -> USB Support -> kmod-usb-usb2		# 开启USB2支持
Kernel modules -> USB Support -> kmod-usb-usb3		# 开启USB3支持
```

>*Luci配置*
```
# LuCI设置
LuCI -> Collections -> luci				# 开启luci
LuCI -> Modules -> Translations	-> Chinese(zh-cn)	# 中文支持
LuCI -> Themes -> luci-theme-material			# 添加主题

# LuCI应用
LuCI -> Applications -> luci-app-aria2			# 下载工具
LuCI -> Applications -> luci-app-firewall		# 防 火 墙
LuCI -> Applications -> luci-app-hd-idle		# 硬盘休眠
LuCI -> Applications -> luci-app-opkg			# 软 件 包
LuCI -> Applications -> luci-app-qos			# 服务质量
LuCI -> Applications -> luci-app-samba4			# 网络共享
LuCI -> Applications -> luci-app-frpc			# 内网穿透
LuCI -> Applications -> luci-app-shadowsocks-libev	# 翻墙软件
LuCI -> Applications -> luci-app-upnp			# UPnP服务
LuCI -> Applications -> luci-app-wol			# 网络唤醒
......

```
>*其他工具*
```
Network -> Download Manager -> ariang	# Aria2管理页面
Network -> File Transfer -> Aria2 Configuration -> ***	# 选择Aria2支持的功能
Network -> File Transfer -> curl	# 添加curl命令
Network -> File Transfer -> wget	# 添加wget命令
Utilities -> Compression -> bsdtar	# tar打包工具
Utilities -> Compression -> gzip	# GZ 压缩套件
Utilities -> Compression -> xz-utils	# XZ 压缩套件
Utilities -> Compression -> unzip	# zip解压工具
Utilities -> Compression -> zip		# zip压缩工具
Utilities -> Disc -> fdisk		# 磁盘分区工具
Utilities -> Disc -> lsblk		# 磁盘查看工具
Utilities -> Editors -> vim		# vim编辑器
Utilities -> Filesystem -> ntfs-3g	# NTFS读写支持
Utilities -> Filesystem -> resize2fs	# 分区大小调整
Utilities -> Terminal -> screen		# 添加screen
Utilities -> pciutils			# 添加lspci命令
Utilities -> usbutils			# 添加lsusb命令
```

>*IPV6支持*
```
Global build settings -> Enable IPv6 support in packages	# 启用IPv6项
Network -> odhcp6c						# IPv6客户端
Network -> odhcpd-ipv6only					# IPv6服务端
Network -> Firewall -> ip6tables				# IPv6防火墙
LuCI -> Protocols -> luci-proto-ipv6				# WebUI支持

```
>*编译设置进系统*
在openwrt目录下新建一个名为files的文件夹，openwrt在编译的时候，会把files文件夹里
的文件编译到固件的根目录。所以把配置好的文件放入files文件夹即可。


