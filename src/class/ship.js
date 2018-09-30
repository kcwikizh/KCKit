const ItemBase = require('./base.js')
const vars = require('../variables')
const bonuses = require('../data/bonus')
const getName = require('../utils/get-name')
const getdb = require('../get/db')
const checkAACI = require('../check/aaci')
const checkShip = require('../check/ship')
const shipTypes = require('../types/ships')
const equipmentTypes = require('../types/equipments')

module.exports = class Ship extends ItemBase {
    /**
     * 获取舰名
     * 快捷方式 - ship._name （默认连接符，默认语言）
     * 
     * @param {String|Boolean|undefined)} [joint=vars.joint] - 连接符，如果存在后缀名，则在舰名和后缀名之间插入该字符串。String：自定义连接符；Boolean：true 添加默认连接符；false 不添加连接符；undefined：默认连接符
     * @param {String} [locale=vars.locale] - 语言ID
     * @returns {String} 舰名[连接符[后缀名]]
     */
    getName(joint = vars.joint, locale = vars.locale) {
        const suffix = this.getSuffix(locale)

        if (!suffix)
            return this.getNameNoSuffix(locale)

        if (joint === true)
            joint = vars.joint
        else if (!joint && /^[a-z]/.test(suffix.substr(0, 1)))
            joint = ' '

        return this.getNameNoSuffix(locale)
            + joint
            + suffix
        // (
        // (joint === true ? vars.joint : joint)
        // + suffix
        // )
    }

    /**
     * 获取舰名，不包括后缀
     * 
     * @param {String} [locale=vars.locale]  - 语言ID
     * @returns {String}
     */
    getNameNoSuffix(locale = vars.locale) {
        return getName(this.name, locale)
        // return this.name[locale] || this.name.ja_jp
    }

    /**
     * 获取后缀名
     * 
     * @param {String} [theLocale=vars.locale]  - 语言ID
     * @returns {String}
     */
    getSuffix(theLocale = vars.locale) {
        return this.name.suffix
            ? (
                getdb('ship_namesuffix')[this.name.suffix][theLocale]
                || getdb('ship_namesuffix')[this.name.suffix].ja_jp
                || ''
            )
            : ''
    }

    /**
     * 获取舰种名称
     * 快捷方式 - ship._type （默认语言）
     * 
     * @param {String} [theLocale=vars.locale]  - 语言ID
     * @returns {String}
     */
    getType(theLocale = vars.locale) {
        return this.type
            ? (
                getdb('ship_types')[this.type].name[theLocale]
                || getdb('ship_types')[this.type].name.ja_jp
                || ''
            )
            : null
    }
    get _type() {
        return this.getType()
    }

    /**
     * 获取舰级名称
     * 快捷方式 - ship._class （默认语言）
     * 
     * @param {String} [theLocale=vars.locale]  - 语言ID
     * @returns {String}
     */
    getClass(theLocale = vars.locale) {
        return this.class
            ? (
                getdb('ship_classes')[this.class].name[theLocale]
                || getdb('ship_classes')[this.class].name.ja_jp
                || ''
            )
            : null
    }
    get _class() {
        return this.getClass()
    }

    /**
     * 获取改修系列数据
     * 快捷方式 - ship._series
     * 
     * @returns {Object}
     */
    getSeriesData() {
        return this.series
            ? getdb('ship_series')[this.series].ships
            : [{
                'id': this.id
            }]
    }
    get _series() {
        return this.getSeriesData()
    }

    /**
     * 获取指定id图鉴path
     * 获取全部图鉴 - ship._pics
     * 
     * @param {Number} [picId = 0] - 图鉴id
     * @param {String} [ext = vars.extPic] - 扩展名
     * @returns {String} path
     */
    getPic(picId = 0, ext = vars.extPic) {
        // let series = this.getSeriesData()
        const thePicId = parseInt(picId)
        const revision = this.illust_revision ? `?${this.illust_revision}` : ""

        const getUrl = ship => `${typeof ship === 'number' ? ship : ship.id}/${picId}${ext}${revision}`

        switch (thePicId) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 12:
            case 13:
            case 14:
                return getUrl(this.id)
            default: {
                let currentShip = this
                while (currentShip.illust_same_as_prev && currentShip.remodel && currentShip.remodel.prev)
                    currentShip = currentShip.remodel.prev

                return getUrl(currentShip)
            }
        }
    }
    /**
     * 获取全部图鉴
     * 
     * @readonly
     * @returns {String[]} 图鉴path
     */
    get _pics() {
        let arr = []
        for (let i = 0; i < 15; i++) {
            arr.push(this.getPic(i))
        }
        return arr
    }

    /**
     * 获取航速
     * 快捷方式 - ship._speed
     * 
     * @param {String|Boolean} [theLocale=vars.locale] - 语言ID。Boolean：如果为false仅返回航速属性值而非航速字符串
     * @returns {String|Number}
     */
    getSpeed(theLocale = vars.locale) {
        if (theLocale === false)
            return this.stat.speed
        return require('../get/speed')(this.stat.speed, theLocale)
    }
    get _speed() {
        return this.getSpeed()
    }

    /**
     * 获取航速提升规则，优先级：舰娘 > 舰级 > 舰种 > 默认值（low-2）
     * 快捷方式 - ship._speedRule
     * 
     * @returns {String}
     */
    getSpeedRule() {
        if (this.speed_rule) return this.speed_rule
        return this.class
            ? (getdb('ship_classes')[this.class].speed_rule || 'low-2')
            : 'low-2'
    }
    get _speedRule() {
        return this.getSpeedRule()
    }

    /**
     * 获取射程
     * 快捷方式 - ship._range
     * 
     * @param {String|Boolean} [theLocale=vars.locale] - 语言ID。Boolean：如果为false仅返回射程属性值而非射程字符串
     * @returns {String|Number}
     */
    getRange(theLocale = vars.locale) {
        if (theLocale === false)
            return this.stat.range
        return require('../get/range')(this.stat.range, theLocale)
    }
    get _range() {
        return this.getRange()
    }

    /**
     * 获取可配置装备类型
     * 快捷方式 - ship._equipmentTypes
     * 
     * @param {Number} [slotIndex] 装备栏位index。从 0 开始。如果给定，则会查询该栏位的装备类型，包含该栏位特有的类型
     * @returns {Number[]} - 装备ID
     */
    getEquipmentTypes(slotIndex) {
        const disabled = this.additional_disable_item_types || []
        const shipType = getdb('ship_types')[this.type]
        const types = shipType.equipable.concat((this.additional_item_types || []))
        if (typeof slotIndex === 'number' &&
            Array.isArray(shipType.additional_item_types_by_slot) &&
            Array.isArray(shipType.additional_item_types_by_slot[slotIndex])
        ) {
            shipType.additional_item_types_by_slot[slotIndex].forEach(id =>
                types.push(id)
            )
        }
        return types
            .filter(type => !disabled.includes(type))
            .sort(function (a, b) {
                return a - b
            })
    }
    get _equipmentTypes() {
        return this.getEquipmentTypes()
    }

    /**
     * 判断该舰娘是否可配置给定的类型的装备
     * 
     * @param {(number|number[]|string|string[])} equipmentType 装备类型，如果为 Array，会判断是否满足所有条件
     * @param {Number} [slotIndex] 装备栏位index。从 0 开始
     * @returns {boolean}
     */
    canEquip(equipmentType, slotIndex) {
        if (Array.isArray(equipmentType)) {
            return equipmentType.every(type => this.canEquip(type, slotIndex))
        }
        if (typeof equipmentType === 'string') {
            if (Array.isArray(equipmentTypes[equipmentType]))
                return equipmentTypes[equipmentType].some(type => this.canEquip(type, slotIndex))
            if (typeof equipmentTypes[equipmentType] === 'number')
                return this.canEquip(equipmentTypes[equipmentType], slotIndex)
            if (Array.isArray(equipmentTypes[equipmentType + 's']))
                return equipmentTypes[equipmentType + 's'].some(type => this.canEquip(type, slotIndex))
        }
        // 如果传入的为 Equipment，获取 type
        if (typeof equipmentType === 'object' && typeof equipmentType.type !== 'undefined')
            equipmentType = equipmentType.type
        if (isNaN(equipmentType)) {
            return false
        } else {
            return this.getEquipmentTypes(slotIndex).includes(parseInt(equipmentType))
        }
    }

    /**
     * 获取指定属性
     * 
     * @param {String} attr - 指定属性名
     * @param {Number} [lvl=1] - 指定等级
     * @returns {String|Number|Boolean|undefined} - 属性。Boolean：false表明该舰娘无此能力。undfined：表明未指定数值
     */
    getAttribute(attr, lvl = 1) {
        if (lvl > vars.maxShipLv) lvl = vars.maxShipLv

        const getStatLvl = (lvl = 1, base, max, defaultValue = false) => {
            max = max || base
            if (base < 0 || max < 0)
                return undefined
            if (max === 0)
                return defaultValue
            if (base == max)
                return max
            return Math.floor(base + (max - base) * lvl / 99)
        }

        let value

        switch (attr) {
            case 'consum.fuel': return this.getAttribute('fuel', lvl)
            case 'consum.ammo': return this.getAttribute('ammo', lvl)

            case 'hp':
                value = this.stat.hp
                if (lvl > 99) {
                    if (this.stat.hp >= 90) value = this.stat.hp + 9
                    else if (this.stat.hp >= 70) value = this.stat.hp + 8
                    else if (this.stat.hp >= 50) value = this.stat.hp + 7
                    else if (this.stat.hp >= 40) value = this.stat.hp + 6
                    else if (this.stat.hp >= 30) value = this.stat.hp + 5
                    else value = this.stat.hp + 4
                    if (value > this.stat.hp_max) value = this.stat.hp_max
                }
                return value

            case 'speed':
                return this._speed

            case 'range':
                return this._range

            case 'luck':
                if (lvl > 99)
                    return this.stat.luck + 3
                return this.stat.luck

            case 'fuel':
            case 'ammo':
                if (lvl > 99)
                    return Math.floor(this.consum[attr] * 0.85)
                return this.consum[attr]

            case 'aa':
            case 'armor':
            case 'fire':
                return this.stat[attr + '_max'] || this.stat[attr]

            case 'torpedo':
                return this.stat[attr + '_max'] || this.stat[attr] || false

            case 'night': {
                if (this.stat.fire + this.stat.torpedo <= 0)
                    // if (this.isType('carrier') && !this.additional_night_shelling)
                    return false
                return (this.stat.fire_max + this.stat.torpedo_max) || 0
            }

            case 'asw':
                return getStatLvl(
                    lvl,
                    this.stat[attr],
                    this.stat[attr + '_max'],
                    /^(5|8|9|12|24|30)$/.test(this.type) ? 0 : false
                )

            default:
                return getStatLvl(lvl, this.stat[attr], this.stat[attr + '_max'])
        }
    }
    getStat(stat, lvl = 1) {
        return this.getAttribute(stat, lvl)
    }

    /*	获取关系
        变量
            relation	[OPTIONAL]
                String		关系名
        返回值
            Object			如果没有给出 relation，返回关系对象
            String||Number	如果给出 relation，返回值，默认读取 rels 下的属性，如果不存在，读取上一个改造版本的对应关系
    */
    getRel(relation) {
        if (relation) {
            if (!this.rels[relation] && this.remodel && this.remodel.prev) {
                let prev = getdb('ships')[this.remodel.prev]
                while (prev) {
                    if (prev.rels && prev.rels[relation])
                        return prev.rels[relation]
                    if (!prev.remodel || !prev.remodel.prev)
                        prev = null
                    else
                        prev = getdb('ships')[prev.remodel.prev]
                }
            }
            return this.rels[relation]
        } else {
            return this.rels
        }
    }

    /*	获取声优
        变量
            language	[OPTIONAL]
                String		语言代码，默认为 KC.lang
        返回值
            String		声优名
        快捷方式
            ship._cv	默认语言
    */
    getCV(theLocale = vars.locale) {
        const id = this.getRel('cv')
        if (id)
            return getdb('entities')[id].getName(theLocale)
        return
    }
    get _cv() {
        return this.getCV()
    }

    /*	获取画师
        变量
            language	[OPTIONAL]
                String		语言代码，默认为 KC.lang
        返回值
            String		画师名
        快捷方式
            ship._illustrator	默认语言
    */
    getIllustrator(theLocale = vars.locale) {
        let id = this.getRel('illustrator')
        if (id)
            return getdb('entities')[id].getName(theLocale)
        return
    }
    get _illustrator() {
        return this.getIllustrator()
    }

    /* 获取该舰娘可能的最低等级
     */
    getMinLv() {
        const series = this._series
        let lv
        series.some((o, index) => {
            if (this.id == o.id) {
                if (index) {
                    lv = series[index - 1].next_lvl
                } else {
                    lv = 1
                }
            }
            return lv
        })
        return lv
    }
    get _minLv() {
        return this.getMinLv()
    }

    /**
     * 判断舰种大类
     * 
     * @param {String} majorType - 舰种大类，目前支持：Battleship/BB, Carrier/CV, LightCruiser/CL, HeavyCruiser/CA, Submarine/SS, SeaplaneTender/AV, Destroyer/DD
     * @return {Boolean}
     */
    isType(majorType) {
        const shipTypes = require('../types/ships')
        switch (majorType.toLowerCase()) {
            case 'battleship':
            case 'battleships':
            case 'bb':
                return shipTypes.Battleships.includes(this.type)

            case 'carrier':
            case 'carriers':
            case 'cv':
                return shipTypes.Carriers.includes(this.type)

            case 'heavycruiser':
            case 'heavycruisers':
            case 'ca':
                return shipTypes.HeavyCruisers.includes(this.type)

            case 'lightcruiser':
            case 'lightcruisers':
            case 'cl':
                return shipTypes.LightCruisers.includes(this.type)

            case 'submarine':
            case 'submarines':
            case 'ss':
                return shipTypes.Submarines.includes(this.type)

            case 'seaplanetender':
            case 'seaplanetenders':
            case 'seaplane tender':
            case 'seaplane tenders':
            case 'av':
                return shipTypes.SeaplaneTenders.includes(this.type)

            case 'destroyer':
            case 'destroyers':
            case 'dd':
                return shipTypes.Destroyers.includes(this.type)

            default:
                return false
        }
    }

    /**
     * 获取所属海军简称
     * 
     * @readonly
     * @returns {String}
     */
    getNavy() {
        if (this.navy) return this.navy
        return this.class
            ? (getdb('ship_classes')[this.class].navy || 'ijn')
            : 'ijn'
    }
    get _navy() {
        return this.getNavy()
    }

    /**
     * 获取所属海军名称
     * 快捷方式 - ship._navyName （默认语言）
     * 
     * @param {String} [theLocale=vars.locale] - 语言ID
     * @returns {String}
     */
    getNavyName(theLocale = vars.locale) {
        return require('../get/navy')(this._navy, theLocale)
    }
    get _navyName() {
        return this.getNavyName()
    }

    getNo() {
        let theShip = this
        while (theShip.no > vars.hiddenShipIdStartFrom && theShip.remodel && theShip.remodel.prev)
            theShip = getdb('ships')[theShip.remodel.prev]
        return theShip.no
    }

    /**
     * 判断是否拥有额外图鉴
     * 
     * @returns {Ship|Boolean}
     */
    hasExtraIllust() {
        let thisShip = this
        while (thisShip.illust_same_as_prev && thisShip.remodel && thisShip.remodel.prev)
            thisShip = getdb('ships')[thisShip.remodel.prev]
        return Array.isArray(thisShip.illust_extra) ? thisShip : false
    }
    /**
     * 获取额外图鉴
     * 
     * @readonly
     * @returns {String[]|undefined} - 如果有，返回Array，内容为额外图鉴ID
     */
    get _extraIllust() {
        const theShip = this.hasExtraIllust()
        if (theShip)
            return theShip.illust_extra
        return undefined
    }

    getExSlotEquipmentTypes() {
        return vars.exSlotEquipmentTypes.concat(
            this.additional_exslot_item_types || []
        )
    }

    getExSlotOtherEquipments() {
        return vars.exSlotOtherEquipments.concat(
            this.additional_exslot_item_ids || []
        )
    }

    /**
     * 获取额外能力
     * 
     * @param {String} [type] - 要获取的能力
     * @returns {Object|...} - 如果提供了 type，返回该能力。如果没有，返回 Object
     */
    getCapability(type) {
        const capabilities = Object.assign(
            {},
            this.type
                ? getdb('ship_types')[this.type].capabilities || {}
                : {},
            this.class
                ? getdb('ship_classes')[this.class].capabilities || {}
                : {},
            this.capabilities,
        )
        if (!type) return capabilities || {}
        // if (!capabilities) return false
        if (typeof capabilities[type] === 'undefined')
            return false
        return capabilities[type]
    }

    /**
     * 获取额外可提升的值
     * 
     * @param {String} type - 要获取的属性名
     * @param {Number} [lvl] - 设定当前等级
     * @returns {Number|Boolean} - 数值。如果为false，表明不可提升
     */
    getStatExtraMax(type, lvl = 1) {
        switch (type.toLowerCase()) {
            case 'hp': {
                // const hpBase = this.getStat(type, 99)
                // const hpAfterMarriage = this.getStat(type, 100)
                const stat = this.getStat(type, lvl)
                const statMax = this.stat.hp_max
                return Math.max(
                    0,
                    Math.min(
                        vars.shipStatExtraMax[type],
                        statMax - stat
                    )
                )
            }
            case 'asw': {
                if (this.stat.asw)
                    return vars.shipStatExtraMax[type]
                if (shipTypes.LightCruisers.concat(shipTypes.Destroyers).includes(this.type))
                    return vars.shipStatExtraMax[type]
                return false
            }
            default:
                return false
        }
    }

    /**
     * 获取该舰娘所有可用的属性加成装备和装备组合
     * @returns {Array} Bonuses
     */
    getBonuses() {
        if (!Array.isArray(this.__bonuses))
            this.__bonuses = bonuses.filter(bonus => (
                checkShip(this, bonus.ship)
            ))
        return this.__bonuses
    }

    /**
     * 获取该舰娘所有可用的 AACI
     * @returns {Array} AACI
     */
    getAACI() {
        if (!Array.isArray(this.__aaci)) {
            this.__aaci = []
            checkAACI(this).forEach(aaci => {
                const {
                    conditions,
                    ...obj
                } = aaci
                if (Array.isArray(conditions)) {
                    conditions.forEach(condition => {
                        this.__aaci.push({
                            ...obj,
                            ...condition
                        })
                    })
                } else {
                    this.__aaci.push(obj)
                }
            })
        }
        return this.__aaci
    }
}
