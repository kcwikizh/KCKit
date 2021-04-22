/**
 * @module
 * 装备额外属性收益
 *
 * 344. 九七式艦攻改 試製三号戊型(空六号電探改装備機)
 *      https://wikiwiki.jp/kancolle/%E4%B9%9D%E4%B8%83%E5%BC%8F%E8%89%A6%E6%94%BB%E6%94%B9%20%E8%A9%A6%E8%A3%BD%E4%B8%89%E5%8F%B7%E6%88%8A%E5%9E%8B%28%E7%A9%BA%E5%85%AD%E5%8F%B7%E9%9B%BB%E6%8E%A2%E6%94%B9%E8%A3%85%E5%82%99%E6%A9%9F%29
 * 345. 九七式艦攻改(熟練) 試製三号戊型(空六号電探改装備機)
 *      https://wikiwiki.jp/kancolle/%E4%B9%9D%E4%B8%83%E5%BC%8F%E8%89%A6%E6%94%BB%E6%94%B9%28%E7%86%9F%E7%B7%B4%29%20%E8%A9%A6%E8%A3%BD%E4%B8%89%E5%8F%B7%E6%88%8A%E5%9E%8B%28%E7%A9%BA%E5%85%AD%E5%8F%B7%E9%9B%BB%E6%8E%A2%E6%94%B9%E8%A3%85%E5%82%99%E6%A9%9F%29
 *
 */

const {
    赤城改二戊,
    加賀改二戊,

    龍鳳改,
    龍鳳改二,
    龍鳳改二戊,

    祥鳳改,

    瑞鳳改二,
    瑞鳳改二乙,
} = require('../../ship-ids');

const 九七式艦攻改_試製三号戊型_空六号電探改装備機 = [
    {
        equipment: 344,
        ship: {
            isID: [祥鳳改],
        },
        bonus: {
            fire: 2,
            asw: 1,
        },
    },
    {
        equipment: 344,
        ship: {
            isID: [瑞鳳改二, 瑞鳳改二乙],
        },
        bonus: {
            fire: 2,
            asw: 2,
        },
    },
    {
        equipment: 344,
        ship: {
            isID: [龍鳳改, 龍鳳改二],
        },
        bonus: {
            fire: 4,
            asw: 1,
        },
    },
    {
        equipment: 344,
        ship: {
            isID: [龍鳳改二戊],
        },
        bonus: {
            fire: 5,
            asw: 2,
        },
    },
    {
        equipment: 344,
        ship: {
            isID: [赤城改二戊, 加賀改二戊],
        },
        bonus: {
            fire: 3,
        },
    },
];

const 九七式艦攻改_熟練_試製三号戊型_空六号電探改装備機 = [
    {
        equipment: 345,
        ship: {
            isID: [祥鳳改],
        },
        bonus: {
            fire: 3,
            evasion: 1,
            asw: 1,
        },
    },
    {
        equipment: 345,
        ship: {
            isID: [瑞鳳改二, 瑞鳳改二乙],
        },
        bonus: {
            fire: 3,
            evasion: 3,
            asw: 2,
        },
    },
    {
        equipment: 345,
        ship: {
            isID: [龍鳳改, 龍鳳改二],
        },
        bonus: {
            fire: 5,
            evasion: 2,
            asw: 1,
        },
    },
    {
        equipment: 345,
        ship: {
            isID: [龍鳳改二戊],
        },
        bonus: {
            fire: 5,
            evasion: 3,
            asw: 2,
        },
    },
    {
        equipment: 345,
        ship: {
            isID: [赤城改二戊, 加賀改二戊],
        },
        bonus: {
            fire: 3,
            evasion: 1,
        },
    },
];

module.exports = [
    ...九七式艦攻改_試製三号戊型_空六号電探改装備機,
    ...九七式艦攻改_熟練_試製三号戊型_空六号電探改装備機,
];
