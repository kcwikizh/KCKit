const { あきつ丸, あきつ丸改, 神州丸, 神州丸改 } = require('../ship-ids');

/** @type {Object} 舰娘系列 */
module.exports = {
    ...require('./bb'),
    ...require('./cv'),
    ...require('./ca'),
    ...require('./cl'),
    ...require('./dd'),
    ...require('./ss'),

    //

    Mizuho: [451, 348],
    Kamoi: [162, 499, 500],
    CommandantTeste: [491, 372],
    Akitsumaru: [あきつ丸, あきつ丸改],
    Shinsyuumaru: [神州丸, 神州丸改],
};
