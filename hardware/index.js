var device = new (require('./device'))('USB Laser Mouse');

device.on("data", function(data) {
    console.dir(data);
});

device.on("error", function(err) {
    console.dir(err);
});
