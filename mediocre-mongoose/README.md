### Step 2: Mediocre Mongoose
Let's first build our image:
```
cd ~/projects/container-lab
docker build -t mgm:0.1.0 --build-arg ARCH=$(uname -m) -f mediocre-mongoose/Dockerfile .
docker run -it --rm --privileged --pid=host -p 3000:3000 --device=/dev/:/devbind/ mgm:0.1.0
```

Try the same steps as before, see what we can do now