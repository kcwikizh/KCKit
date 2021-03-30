/**
 * @module
 * 装备额外属性收益
 *
 * 287. 三式爆雷投射機 集中配備
 *      https://wikiwiki.jp/kancolle/%E4%B8%89%E5%BC%8F%E7%88%86%E9%9B%B7%E6%8A%95%E5%B0%84%E6%A9%9F%20%E9%9B%86%E4%B8%AD%E9%85%8D%E5%82%99
 *
 */

const {
    能代改二,
    由良改二,
    那珂改二,
    五十鈴改二,
    夕張改二丁,
    雪風改二,
} = require('../../ship-ids');

// ============================================================================

module.exports = [
    {
        equipment: 287,
        ship: {
            isID: [能代改二],
        },
        bonus: {
            asw: 3,
        },
    },
    {
        equipment: 287,
        ship: {
            isID: [五十鈴改二, 由良改二, 那珂改二, 夕張改二丁, 雪風改二],
        },
        bonus: {
            asw: 1,
            evasion: 1,
        },
    },
];
