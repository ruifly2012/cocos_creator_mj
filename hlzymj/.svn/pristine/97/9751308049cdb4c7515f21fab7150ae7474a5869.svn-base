var Resources = require("Resources");
cc.Class({
    extends: cc.Component,

    properties: {
        mj1_face_dao: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj1_face_li: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj1_face_suit_y: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj1_face_suit_z: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj1_face_y: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj1_face_z: {
            default: null,
            type: cc.SpriteAtlas,
        },

        /*
        mj2_face_dao: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj2_face_li: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj2_face_suit_y: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj2_face_suit_z: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj2_face_y: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj2_face_z: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj3_face_dao: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj3_face_li: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj3_face_suit_y: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj3_face_suit_z: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj3_face_y: {
            default: null,
            type: cc.SpriteAtlas,
        },

        mj3_face_z: {
            default: null,
            type: cc.SpriteAtlas,
        },
        */
    },

    onLoad: function () {

        var self = this;
        
        cc.loader.loadRes("game/mj1/back_left", cc.SpriteFrame, function(err, spriteFrame){
            self.m_mj1_back_left_frame = spriteFrame;
        })

        cc.loader.loadRes("game/mj1/back_right", cc.SpriteFrame, function(err, spriteFrame){
            self.m_mj1_back_right_frame = spriteFrame;
        })

        cc.loader.loadRes("game/mj1/back_top", cc.SpriteFrame, function(err, spriteFrame){
            self.m_mj1_back_top_frame = spriteFrame;
        })


        //麻将的一些角标
        // cc.loader.loadRes("game/mj1/hh_li_laizi", cc.SpriteFrame, function(err, spriteFrame){
        //     self.m_mj_hh_li_laizi = spriteFrame;
        // })

        // cc.loader.loadRes("game/mj1/metop_cao", cc.SpriteFrame, function(err, spriteFrame){
        //     self.m_mj_metop_cao = spriteFrame;
        // })

        // cc.loader.loadRes("game/mj1/left_lai", cc.SpriteFrame, function(err, spriteFrame){
        //     self.m_mj_left_lai = spriteFrame;
        // })

        // cc.loader.loadRes("game/mj1/left_cao", cc.SpriteFrame, function(err, spriteFrame){
        //     self.m_mj_left_cao = spriteFrame;
        // })

        // cc.loader.loadRes("game/mj1/left_gang_lai", cc.SpriteFrame, function(err, spriteFrame){
        //     self.m_mj_left_gang_lai = spriteFrame;
        // })

        // cc.loader.loadRes("game/mj1/left_gang_cao", cc.SpriteFrame, function(err, spriteFrame){
        //     self.m_mj_left_gang_cao = spriteFrame;
        // })

        // cc.loader.loadRes("game/mj1/metop_lai", cc.SpriteFrame, function(err, spriteFrame){
        //     self.m_mj_metop_lai = spriteFrame;
        // })

        // cc.loader.loadRes("game/mj1/metop_gang_lai", cc.SpriteFrame, function(err, spriteFrame){
        //     self.m_mj_metop_gang_lai = spriteFrame;
        // })

        // cc.loader.loadRes("game/mj1/metop_gang_cao", cc.SpriteFrame, function(err, spriteFrame){
        //     self.m_mj_metop_gang_cao = spriteFrame;
        // })

        // cc.loader.loadRes("game/mj1/right_lai", cc.SpriteFrame, function(err, spriteFrame){
        //     self.m_mj_right_lai = spriteFrame;
        // })

        // cc.loader.loadRes("game/mj1/right_cao", cc.SpriteFrame, function(err, spriteFrame){
        //     self.m_mj_right_cao = spriteFrame;
        // })

        // cc.loader.loadRes("game/mj1/right_gang_lai", cc.SpriteFrame, function(err, spriteFrame){
        //     self.m_mj_right_gang_lai = spriteFrame;
        // })

        // cc.loader.loadRes("game/mj1/right_gang_cao", cc.SpriteFrame, function(err, spriteFrame){
        //     self.m_mj_right_gang_cao = spriteFrame;
        // })
    },

    get_frameName: function (foreName, mjValue) {
        return Resources.get_frameName(foreName, mjValue);
    },

    //用于自己出牌 或者碰牌或者红中癞子杠之类的
    get_face_dao_frameName: function (mjValue) {
        return this.get_frameName("hh_dao_", mjValue);
    },

    get_face_dao_spriteFrame: function (mjType, mjValue) {
        var frameName = this.get_face_dao_frameName(mjValue)
        if(frameName){
            if (mjType == "mj1") {
                return this.mj1_face_dao.getSpriteFrame(frameName);
            }
            else if (mjType == "mj2") {
                return this.mj2_face_dao.getSpriteFrame(frameName);
            }
            else if (mjType == "mj3") {
                return this.mj3_face_dao.getSpriteFrame(frameName);
            }
            else {
                console.log("no other mj type");
            }
        }else{
            console.log("mjType ========" + mjType + "  mjValue ===========" + mjValue);
        }
    },

    //用于获取自己手持牌
    get_face_li_frameName: function (mjValue) {
        return this.get_frameName("hh_li_", mjValue);
    },

    get_face_li_SpriteFrame: function (mjType, mjValue) {
        var frameName = this.get_face_li_frameName(mjValue)
        if(frameName){
            if (mjType == "mj1") {
                return this.mj1_face_li.getSpriteFrame(frameName);
            }
            else if (mjType == "mj2") {
                return this.mj2_face_li.getSpriteFrame(frameName);
            }
            else if (mjType == "mj3") {
                return this.mj3_face_li.getSpriteFrame(frameName);
            }
            else {
                console.log("no other mj type");
            }
        }else{
            console.log("mjType ========" + mjType + "  mjValue ===========" + mjValue);
        }
    },

    //用于右边的人碰或者杠的牌
    get_face_suit_y_frameName: function (mjValue) {
        return this.get_frameName("hh_suit_y_", mjValue);
    },

    get_face_suit_y_SpriteFrame: function (mjType, mjValue) {
        var frameName = this.get_face_suit_y_frameName(mjValue)
        if(frameName){
            if (mjType == "mj1") {
                return this.mj1_face_suit_y.getSpriteFrame(frameName);
            }
            else if (mjType == "mj2") {
                return this.mj2_face_suit_y.getSpriteFrame(frameName);
            }
            else if (mjType == "mj3") {
                return this.mj3_face_suit_y.getSpriteFrame(frameName);
            }
            else {
                console.log("no other mj type");
            }
        }else{
            console.log("mjType ========" + mjType + "  mjValue ===========" + mjValue);
        }
    },

    //用于左边的人碰或者杠的牌
    get_face_suit_z_frameName: function (mjValue) {
        return this.get_frameName("hh_suit_z_", mjValue);
    },

    get_face_suit_z_SpriteFrame: function (mjType, mjValue) {

        var frameName = this.get_face_suit_z_frameName(mjValue)
        if(frameName){
            if (mjType == "mj1") {
                return this.mj1_face_suit_z.getSpriteFrame(frameName);
            }
            else if (mjType == "mj2") {
                return this.mj2_face_suit_z.getSpriteFrame(frameName);
            }
            else if (mjType == "mj3") {
                return this.mj3_face_suit_z.getSpriteFrame(frameName);
            }
            else {
                console.log("no other mj type");
            }
        }else{
            console.log("mjType ========" + mjType + "  mjValue ===========" + mjValue);
        }
    },

    //用于左边的人出的牌
    get_face_y_frameName: function (mjValue) {
        return this.get_frameName("hh_y_", mjValue);
    },

    get_face_y_SpriteFrame: function (mjType, mjValue) {

        var frameName = this.get_face_y_frameName(mjValue)
        if(frameName){
            if (mjType == "mj1") {
                return this.mj1_face_y.getSpriteFrame(frameName);
            }
            else if (mjType == "mj2") {
                return this.mj2_face_y.getSpriteFrame(frameName);
            }
            else if (mjType == "mj3") {
                return this.mj3_face_y.getSpriteFrame(frameName);
            }
            else {
                console.log("no other mj type");
            }
        }else{
            console.log("mjType ========" + mjType + "  mjValue ===========" + mjValue);
        }
    },

    //用于右边的人出的牌
    get_face_z_frameName: function (mjValue) {
        return this.get_frameName("hh_z_", mjValue);
    },

    get_face_z_SpriteFrame: function (mjType, mjValue) {
        var frameName = this.get_face_z_frameName(mjValue)
        if(frameName){
            if (mjType == "mj1") {
                return this.mj1_face_z.getSpriteFrame(frameName);
            }
            else if (mjType == "mj2") {
                return this.mj2_face_z.getSpriteFrame(frameName);
            }
            else if (mjType == "mj3") {
                return this.mj3_face_z.getSpriteFrame(frameName);
            }
            else {
                console.log("no other mj type");
            }
        }
        else{
            console.log("mjType ========" + mjType + "  mjValue ===========" + mjValue);
        }
    },
});
