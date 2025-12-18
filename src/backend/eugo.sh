function gocompile() {
    docker run --rm -v "$PWD":/usr/src/myapp -w /usr/src/myapp golang:1.25 go build -v
}
