/**
 * @module
 * 装备额外属性收益
 *
 *  50. 20.3cm(3号)連装砲
 *      https://wikiwiki.jp/kancolle/20.3cm%283%E5%8F%B7%29%E9%80%A3%E8%A3%85%E7%A0%B2
 *
 */

require('../../../../typedef');
const {
    CAV_Mogami,
    CAV_MogamiRevised,
    CAV_Tone,
    CA_Furutaka,
    CA_Aoba,
    CA_Myoukou,
    CA_Takao,
    CA_Mogami,
    CA_Tone,
} = require('../../ship-classes');
const { CAV_MogamiClassSuperRemodel } = require('../../ships');

/** @type {Array<EquipmentBonus>} */
module.exports = [
    {
        equipment: 50,
        ship: {
            isID: [...CAV_MogamiClassSuperRemodel],
        },
        bonusCount: {
            1: {
                fire: 3,
                evasion: 1,
            },
            2: {
                fire: 8,
                evasion: 2,
            },
            3: {
                fire: 12,
                evasion: 3,
            },
            4: {
                fire: 16,
                evasion: 3,
            },
        },
    },

    {
        equipment: 50,
        ship: {
            isClass: [
                CA_Mogami,
                CAV_Mogami,
                CAV_MogamiRevised,
                CA_Tone,
                CAV_Tone,
            ],
        },
        bonusCount: {
            1: {
                fire: 2,
                evasion: 1,
            },
            2: {
                fire: 6,
                evasion: 2,
            },
            3: {
                fire: 9,
                evasion: 3,
            },
            4: {
                fire: 12,
                evasion: 4,
            },
        },
    },

    {
        equipment: 50,
        ship: {
            isClass: [CA_Myoukou, CA_Takao],
        },
        bonus: {
            fire: 2,
            evasion: 1,
        },
    },

    {
        equipment: 50,
        ship: {
            isClass: [CA_Furutaka, CA_Aoba],
        },
        bonus: {
            fire: 1,
        },
    },

    // ------------------------------------------------------------------------

    {
        list: [50, 'SurfaceRadar'],
        equipments: {
            hasID: [50],
            hasSurfaceRadar: true,
        },
        ship: {
            isClass: [CA_Furutaka, CA_Aoba],
        },
        bonus: {
            fire: 1,
            torpedo: 1,
            evasion: 1,
        },
    },
    {
        list: [50, 'SurfaceRadar'],
        equipments: {
            hasID: [50],
            hasSurfaceRadar: true,
        },
        ship: {
            isID: [...CAV_MogamiClassSuperRemodel],
        },
        bonus: {
            fire: 4,
            torpedo: 2,
            evasion: 3,
        },
    },
    {
        list: [
            50,
            30, // 21号対空電探
        ],
        equipments: [
            {
                isID: 50,
            },
            {
                isID: 30,
            },
        ],
        ship: {
            isID: [...CAV_MogamiClassSuperRemodel],
        },
        bonus: {
            fire: 1,
            aa: 3,
            evasion: 2,
        },
    },
    {
        list: [
            50,
            410, // 21号対空電探改二
        ],
        equipments: [
            {
                isID: 50,
            },
            {
                isID: 410,
            },
        ],
        ship: {
            isID: [...CAV_MogamiClassSuperRemodel],
        },
        bonus: {
            fire: 3,
            aa: 3,
            evasion: 2,
        },
    },
    {
        list: [50, 'SurfaceRadar'],
        equipments: {
            hasID: [50],
            hasSurfaceRadar: true,
        },
        ship: {
            isClass: [
                CA_Myoukou,
                CA_Takao,
                CA_Mogami,
                CAV_Mogami,
                CAV_MogamiRevised,
                CA_Tone,
                CAV_Tone,
            ],
        },
        bonus: {
            fire: 3,
            torpedo: 2,
            evasion: 2,
        },
    },
];
