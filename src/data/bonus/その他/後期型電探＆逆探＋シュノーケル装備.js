/**
 * @module
 * 装备额外属性收益
 *
 * 458. 後期型電探＆逆探＋シュノーケル装備
 *      https://wikiwiki.jp/kancolle/%E5%BE%8C%E6%9C%9F%E5%9E%8B%E9%9B%BB%E6%8E%A2%EF%BC%86%E9%80%86%E6%8E%A2%EF%BC%8B%E3%82%B7%E3%83%A5%E3%83%8E%E3%83%BC%E3%82%B1%E3%83%AB%E8%A3%85%E5%82%99
 *
 */

require('../../../../typedef');
const { I201, I203, I13, I14, I47, I400, I401 } = require('../../ship-series');

// ============================================================================

/** @type {Array<EquipmentBonus>} */
module.exports = [
    {
        equipment: 458,
        ship: {
            isID: [...I201, ...I203],
        },
        bonusCount: {
            1: {
                torpedo: 3,
                evasion: 6,
            },
        },
    },
    {
        equipment: 458,
        ship: {
            isID: [...I13, ...I14, ...I47],
        },
        bonusCount: {
            1: {
                torpedo: 3,
                evasion: 4,
            },
        },
    },
    {
        equipment: 458,
        ship: {
            isID: [...I400, ...I401],
        },
        bonusCount: {
            1: {
                torpedo: 3,
                evasion: 3,
            },
        },
    },
];
