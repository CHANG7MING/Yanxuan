/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : yanxuan

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 07/12/2021 21:50:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `num` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES (16, 1, 101202, 7);
INSERT INTO `cart` VALUES (15, 1, 101201, 3);
INSERT INTO `cart` VALUES (11, 1, 100201, 7);

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `img1` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `img2` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `img3` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `img4` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `img5` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `rating` float NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `product_id_uindex`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1019 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1001, '轻巧不粘 金色锤纹雪平锅 多用锅拉面锅', '精致锤纹 多种用途 一锅搞定', '1001-1.webp', '1001-2.webp', '1001-3.webp', '1001-4.webp', '1001-5.webp', 99.1);
INSERT INTO `product` VALUES (1002, '油污不沾少油烟 德国Velosan鹅卵石不粘煎锅', '颜值与实力并存的创新鹅卵石炒锅', '1002-1.webp', '1002-2.webp', '1002-3.webp', '1002-4.webp', '1002-5.webp', 99.7);
INSERT INTO `product` VALUES (1003, '营养均衡，全价冻干双拼猫粮', '91%动物性原料，营养丰富易吸收', '1003-1.webp', '1003-2.webp', '1003-3.webp', '1003-4.webp', '1003-5.webp', 99.5);
INSERT INTO `product` VALUES (1004, '猫狗铲屎官的福音，宠物毛发吸尘器', '小小身材，大爆发力，家庭清扫全面手', '1004-1.webp', '1004-2.webp', '1004-3.webp', '1004-4.webp', '1004-5.webp', 99.2);
INSERT INTO `product` VALUES (1005, '网易云音乐氧气有线入耳式耳机', '自然干净音质；三键线控，高清通话', '1005-1.webp', '1005-2.webp', '1005-3.webp', '1005-4.webp', '1005-5.webp', 99.4);
INSERT INTO `product` VALUES (1006, '【大牌补贴】AirPods Pro无线降噪耳机国行', '主动降噪，配充电盒', '1006-1.webp', '1006-2.webp', '1006-3.webp', '1006-4.webp', '1006-5.webp', 99.8);
INSERT INTO `product` VALUES (1007, '一抽即提，免脏手，加厚抽绳垃圾袋3卷60只', '18μm及10μm两种厚度，袋身不怕漏，3秒抽绳不脏手', '1007-1.webp', '1007-2.webp', '1007-3.webp', '1007-4.webp', '1007-5.webp', 99.8);
INSERT INTO `product` VALUES (1008, '养生袋泡，黑苦荞胚芽茶 6克*21袋', '全胚芽态，麦香醇厚', '1008-1.webp', '1008-2.webp', '1008-3.webp', '1008-4.webp', '1008-5.webp', 99.9);
INSERT INTO `product` VALUES (1009, '麻辣花生 110克', '乳山花生，麻辣爽脆', '1009-1.webp', '1009-2.webp', '1009-3.webp', '1009-4.webp', '1009-5.webp', 99.5);
INSERT INTO `product` VALUES (1010, '32功能区格，男式商务出行机能双肩包', '17个功能分区，理性展现', '1010-1.webp', '1010-2.webp', '1010-3.webp', '1010-4.webp', '1010-5.webp', 99.4);
INSERT INTO `product` VALUES (1011, '竹居·悦时光衣帽架', '置物衣帽架，收纳的艺术', '1011-1.webp', '1011-2.webp', '1011-3.webp', '1011-4.webp', '1011-5.webp', 99.8);
INSERT INTO `product` VALUES (1012, '网易智造人体感应磁吸小夜灯', '人体红外自动感应,磁吸挂贴', '1012-1.webp', '1012-2.webp', '1012-3.webp', '1012-4.webp', '1012-5.webp', 99.1);
INSERT INTO `product` VALUES (1013, '加厚304不锈钢，多尺寸厨房搅拌盆4件套', '可拌肉馅，可做色拉，可做烘焙', '1013-1.webp', '1013-2.webp', '1013-3.webp', '1013-4.webp', '1013-5.webp', 99.3);
INSERT INTO `product` VALUES (1014, '三层防护更安心，一次性医用口罩 组合装', '三层防护 医用一次性口罩', '1014-1.webp', '1014-2.webp', '1014-3.webp', '1014-4.webp', '1014-5.webp', 99.8);

-- ----------------------------
-- Table structure for sku
-- ----------------------------
DROP TABLE IF EXISTS `sku`;
CREATE TABLE `sku`  (
  `id` int(11) NOT NULL,
  `pid` int(11) NULL DEFAULT NULL,
  `subtitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `price` float(10, 2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sku
-- ----------------------------
INSERT INTO `sku` VALUES (100101, 1001, '金色18cm+带盖子', 69.00);
INSERT INTO `sku` VALUES (100102, 1001, '金色20cm+带盖子', 79.00);
INSERT INTO `sku` VALUES (100201, 1002, '乳白-32cm炒锅 （赠价值79元硅胶锅铲）', 385.00);
INSERT INTO `sku` VALUES (100202, 1002, '乳白-26cm炒锅 （赠价值79元硅胶锅铲）', 235.00);
INSERT INTO `sku` VALUES (100301, 1003, '120g/袋', 12.00);
INSERT INTO `sku` VALUES (100302, 1003, '1.8kg/袋*4袋', 359.00);
INSERT INTO `sku` VALUES (100401, 1004, '吸尘器', 415.00);
INSERT INTO `sku` VALUES (100402, 1004, '滤芯', 19.00);
INSERT INTO `sku` VALUES (100501, 1005, '黑色', 99.00);
INSERT INTO `sku` VALUES (100502, 1005, '红色', 99.00);
INSERT INTO `sku` VALUES (100601, 1006, '官方标配', 1519.00);
INSERT INTO `sku` VALUES (100701, 1007, '18μm厚款-中号-3卷60只', 11.90);
INSERT INTO `sku` VALUES (100702, 1007, '18μm厚款-中号-9卷180只', 48.00);
INSERT INTO `sku` VALUES (100801, 1008, '升级款: 126克', 12.00);
INSERT INTO `sku` VALUES (100901, 1009, '110g', 6.00);
INSERT INTO `sku` VALUES (100902, 1009, '110g*3', 16.00);
INSERT INTO `sku` VALUES (101001, 1010, '黑色30L', 299.00);
INSERT INTO `sku` VALUES (101002, 1010, '黑色20L', 279.00);
INSERT INTO `sku` VALUES (101101, 1011, '大号1120*350*1476mm', 339.00);
INSERT INTO `sku` VALUES (101102, 1011, '纸巾盒', 69.00);
INSERT INTO `sku` VALUES (101201, 1012, '黑色', 59.00);
INSERT INTO `sku` VALUES (101202, 1012, '白色', 59.00);
INSERT INTO `sku` VALUES (101301, 1013, '四件套', 119.00);
INSERT INTO `sku` VALUES (101302, 1013, '两件套', 69.00);
INSERT INTO `sku` VALUES (101401, 1014, '10片', 9.90);
INSERT INTO `sku` VALUES (101402, 1014, '50片', 139.00);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_username_uindex`(`username`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '123', '111');
INSERT INTO `user` VALUES (2, '1234', '111');

SET FOREIGN_KEY_CHECKS = 1;
