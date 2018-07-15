function test1() {
    setTimeout(() => { console.log('db call ') }, 0);

    for (var i = 0; i < 1e6; i++) { }

    console.log('log 1');
}

module.exports = {
    test1
};