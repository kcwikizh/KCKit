/**
 * @module
 * 装备额外属性收益
 * 35. **三式弾**
 */

// https://wikiwiki.jp/kancolle/%E4%B8%89%E5%BC%8F%E5%BC%BE

module.exports = [

    {
        equipment: 35,
        ship: {
            isID: [
                149, // 金剛改二
            ],
        },
        bonus: {
            fire: 1,
            aa: 1,
        }
    },

    {
        equipment: 35,
        ship: {
            isID: [
                150, // 比叡改二
            ],
        },
        bonus: {
            aa: 1,
        }
    },

    {
        equipment: 35,
        ship: {
            isID: [
                151, // 榛名改二
            ],
        },
        bonus: {
            aa: 1,
            evasion: 1,
        }
    },

    {
        equipment: 35,
        ship: {
            isID: [
                152, // 霧島改二
            ],
        },
        bonus: {
            fire: 1,
        }
    },

]
