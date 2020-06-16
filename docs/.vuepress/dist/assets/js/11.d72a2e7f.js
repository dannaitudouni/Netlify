(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{580:function(t,e,s){"use strict";s.r(e);var n=s(4),i=Object(n.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"基本说明"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基本说明"}},[t._v("#")]),t._v(" 基本说明")]),t._v(" "),s("blockquote",[s("p",[t._v("转自："),s("a",{attrs:{href:"http://leux.cn/doc/OPENWRT%E7%BC%96%E8%AF%91%E4%B9%8B%E6%A0%91%E8%8E%93%E6%B4%BE4B.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://leux.cn/doc/OPENWRT编译之树莓派4B.html"),s("OutboundLink")],1),t._v("\n适用硬件： 树莓派4B\n编译系统： Ubuntu 18 LTS")])]),t._v(" "),s("h2",{attrs:{id:"安装编译工具"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装编译工具"}},[t._v("#")]),t._v(" 安装编译工具")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("sudo apt-get update\nsudo apt-get install build-essential asciidoc binutils bzip2 \\\ngawk gettext git libncurses5-dev libz-dev patch unzip zlib1g-dev \\\nlib32gcc1 libc6-dev-i386 subversion flex uglifyjs libssl-dev upx \\\ngcc-multilib p7zip p7zip-full msmtp texinfo libglib2.0-dev xmlto \\\ngit-core qemu-utils libelf-dev autoconf automake libtool autopoint \\\ncurl wget device-tree-compiler rsync\n")])])]),s("h2",{attrs:{id:"获取编译源码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#获取编译源码"}},[t._v("#")]),t._v(" 获取编译源码")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('# 设置代理来加速源码下载，没有代理可跳过或根据需求设置\n# export all_proxy="127.0.0.1:7890"\n\n# 获取openwrt官方源码\nmkdir openwrt\ncd openwrt/\ngit clone https://git.openwrt.org/openwrt/openwrt.git ./\n\n# 以后每次编译前建议执行以下三行命令更新源码\ngit pull\n./scripts/feeds update -a\n./scripts/feeds install -a\n\nmake defconfig\t\t# 测试编译环境\nmake menuconfig\t\t# 进入固件配置界面\nmake download -j8 V=s\t# 下载所需源码，请尽量使用梯子\nmake -j1 V=s\t\t# 首次编译推荐用单线程\n\n# 再次编译前建议使用make clean清理\nmake clean\t# 清除bin目录\nmake dirclean\t# 清除bin目录和交叉编译工具及工具链目录\nmake distclean\t# 清除所有相关的东西，包括下载的软件包，配置文件，feed内容等\n')])])]),s("h2",{attrs:{id:"树莓派4b编译选项"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#树莓派4b编译选项"}},[t._v("#")]),t._v(" 树莓派4B编译选项")]),t._v(" "),s("blockquote",[s("p",[s("em",[t._v("可选内核配置")])])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("# 额外配置内核参数，一般不需要配置\n# 只能包含到内核而不能作为模块，因为编译后的模块不会添加到固件内\nmake kernel_menuconfig\t# 进入内核配置界面\n\n# 打开KVM支持：Virtualization > Kernel-based Virtual Machine support\n# 修改的内核参数会保存到openwrt/target/linux/bcm27xx/bcm2711/config-5.4\n# 和openwrt/target/linux/generic/config-5.4合成最终内核配置文件\n# openwrt/build_dir/target-aarch64_cortex-a72_musllinux-bcm27xx_bcm2711/linux-5.4.42/.config\n\n")])])]),s("blockquote",[s("p",[s("em",[t._v("固件编译配置")])])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("make menuconfig参数配置\n# 必选配置\nTarget System -> Broadcom BCM27xx\nSubtarget -> BCM2711 boards (64 bit)\nTarget Profile -> Raspberry Pi 4B\n\n# 镜像参数\nTarget Images -> ext4\t\t# ext4格式的固件可方便地调整分区大小\nTarget Images -> squashfs\t# squashfs格式的固件可恢复出厂设置\nTarget Images -> Kernel partition size = 64\t\t# boot分区大小为64M\nTarget Images -> Root filesystem partition size = 512\t# root分区大小为512M\n\n# 可选工具\nBase system -> block-mount\t# 在LuCI界面添加<挂载点>菜单\nBase system -> blockd\t\t# 自动挂载设备\nBase system -> wireless-tools\t# 无线扩展工具\nAdministration -> htop\t\t# 添加htop命令\nFirmware -> xxx\t\t\t# 选择你需要的网卡固件，默认即可\n")])])]),s("blockquote",[s("p",[s("em",[t._v("内核模块")])])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("# 文件系统\nKernel modules -> Filesystems -> kmod-fs-ext4\nKernel modules -> Filesystems -> kmod-fs-ntfs\nKernel modules -> Filesystems -> kmod-fs-squashfs\nKernel modules -> Filesystems -> kmod-fs-vfat\nKernel modules -> Filesystems -> kmod-fuse\n\n# 网卡支持\nKernel modules -> Network Devices -> kmod-xxx\t# 有线网卡支持，跟以下几项可根据需求选择性添加\nKernel modules -> Wireless Drivers -> kmod-rt2800-usb\t\t\t# 添加Ralink RT5370芯片的USB无线网卡驱动\nKernel modules -> USB Support -> kmod-usb-net -> kmod-usb-net-sr9700\t# 添加USB2.0的有线网卡SR9700芯片支持\nKernel modules -> USB Support -> kmod-usb-net -> kmod-usb-net-rtl8152\t# 添加USB2/3的有线网卡RTL8152/3芯片支持\nKernel modules -> USB Support -> kmod-usb-net -> kmod-usb-net-asix\t# 添加支持亚信的有线网卡支持\nKernel modules -> USB Support -> kmod-usb-net -> kmod-usb-net-asix-ax88179  # 添加USB3.0的有线网卡芯片AX88179的驱动\n\n# USB支持\nKernel modules -> USB Support -> kmod-usb-core\t\t# 启用USB支持\nKernel modules -> USB Support -> kmod-usb-hid\t\t# USB键鼠支持\nKernel modules -> USB Support -> kmod-usb-ohci\t\t# 添加OHCI支持\nKernel modules -> USB Support -> kmod-usb-uhci\t\t# 添加UHCI支持\nKernel modules -> USB Support -> kmod-usb-storage\t# 启用USB存储\nKernel modules -> USB Support -> kmod-usb-storage-extras\nKernel modules -> USB Support -> kmod-usb-usb2\t\t# 开启USB2支持\nKernel modules -> USB Support -> kmod-usb-usb3\t\t# 开启USB3支持\n")])])]),s("blockquote",[s("p",[s("em",[t._v("Luci配置")])])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("# LuCI设置\nLuCI -> Collections -> luci\t\t\t\t# 开启luci\nLuCI -> Modules -> Translations\t-> Chinese(zh-cn)\t# 中文支持\nLuCI -> Themes -> luci-theme-material\t\t\t# 添加主题\n\n# LuCI应用\nLuCI -> Applications -> luci-app-aria2\t\t\t# 下载工具\nLuCI -> Applications -> luci-app-firewall\t\t# 防 火 墙\nLuCI -> Applications -> luci-app-hd-idle\t\t# 硬盘休眠\nLuCI -> Applications -> luci-app-opkg\t\t\t# 软 件 包\nLuCI -> Applications -> luci-app-qos\t\t\t# 服务质量\nLuCI -> Applications -> luci-app-samba4\t\t\t# 网络共享\nLuCI -> Applications -> luci-app-frpc\t\t\t# 内网穿透\nLuCI -> Applications -> luci-app-shadowsocks-libev\t# 翻墙软件\nLuCI -> Applications -> luci-app-upnp\t\t\t# UPnP服务\nLuCI -> Applications -> luci-app-wol\t\t\t# 网络唤醒\n......\n\n")])])]),s("blockquote",[s("p",[s("em",[t._v("其他工具")])])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("Network -> Download Manager -> ariang\t# Aria2管理页面\nNetwork -> File Transfer -> Aria2 Configuration -> ***\t# 选择Aria2支持的功能\nNetwork -> File Transfer -> curl\t# 添加curl命令\nNetwork -> File Transfer -> wget\t# 添加wget命令\nUtilities -> Compression -> bsdtar\t# tar打包工具\nUtilities -> Compression -> gzip\t# GZ 压缩套件\nUtilities -> Compression -> xz-utils\t# XZ 压缩套件\nUtilities -> Compression -> unzip\t# zip解压工具\nUtilities -> Compression -> zip\t\t# zip压缩工具\nUtilities -> Disc -> fdisk\t\t# 磁盘分区工具\nUtilities -> Disc -> lsblk\t\t# 磁盘查看工具\nUtilities -> Editors -> vim\t\t# vim编辑器\nUtilities -> Filesystem -> ntfs-3g\t# NTFS读写支持\nUtilities -> Filesystem -> resize2fs\t# 分区大小调整\nUtilities -> Terminal -> screen\t\t# 添加screen\nUtilities -> pciutils\t\t\t# 添加lspci命令\nUtilities -> usbutils\t\t\t# 添加lsusb命令\n")])])]),s("blockquote",[s("p",[s("em",[t._v("IPV6支持")])])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("Global build settings -> Enable IPv6 support in packages\t# 启用IPv6项\nNetwork -> odhcp6c\t\t\t\t\t\t# IPv6客户端\nNetwork -> odhcpd-ipv6only\t\t\t\t\t# IPv6服务端\nNetwork -> Firewall -> ip6tables\t\t\t\t# IPv6防火墙\nLuCI -> Protocols -> luci-proto-ipv6\t\t\t\t# WebUI支持\n\n")])])]),s("blockquote",[s("p",[s("em",[t._v("编译设置进系统")]),t._v("\n在openwrt目录下新建一个名为files的文件夹，openwrt在编译的时候，会把files文件夹里\n的文件编译到固件的根目录。所以把配置好的文件放入files文件夹即可。")])])])}),[],!1,null,null,null);e.default=i.exports}}]);