/**
 * 装备额外属性收益
 * 106. **13号対空電探改**
 *
 * @module
 */

// https://wikiwiki.jp/kancolle/13%E5%8F%B7%E5%AF%BE%E7%A9%BA%E9%9B%BB%E6%8E%A2%E6%94%B9

const {
    // Yahagi,
    Ooyodo,
    Kashima,

    // Ushio,
    Hibiki,
    // Hatsushimo,
    // Shigure,
    Kasumi,
    Yukikaze,
    Isokaze,
    Hamakaze,
    Asashimo,
    Suzutsuki,
} = require('../../ships');
const {
    長門改二,
    榛名改二,
    矢矧,
    矢矧改,
    矢矧改二,
    矢矧改二乙,
} = require('../../ship-ids');

module.exports = [
    {
        equipment: 106,
        ship: {
            isID: [...Ooyodo, ...Kashima, ...Hibiki],
        },
        bonus: {
            aa: 1,
            evasion: 3,
            armor: 1,
        },
    },

    {
        equipment: 106,
        ship: {
            isID: [矢矧改二, 矢矧改二乙],
        },
        bonus: {
            fire: 1,
            aa: 4,
            evasion: 4,
            armor: 2,
        },
    },

    {
        equipment: 106,
        ship: {
            isID: [
                矢矧,
                矢矧改,
                ...Kasumi,
                ...Yukikaze,
                ...Isokaze,
                ...Hamakaze,
                ...Asashimo,
                ...Suzutsuki,
            ],
        },
        bonus: {
            aa: 2,
            evasion: 2,
            armor: 1,
        },
    },

    {
        equipment: 106,
        ship: {
            isID: [
                榛名改二,
                長門改二,
                407, // 潮改二
                145, // 時雨改二
                419, // 初霜改二
            ],
        },
        bonus: {
            fire: 1,
            aa: 2,
            evasion: 3,
            armor: 1,
        },
    },

    // ------------------------------------------------------------------------
];
