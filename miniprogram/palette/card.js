export default class LastMayday {
  palette(userinfo, province, count) {

    return ({
      width: '670rpx',
      height: '1190rpx',
      background: '../../palette/sharebk.jpg',
      views: [{
          id: 'my-text-id',
          type: 'text',
        text: "                          我是" + userinfo.nickName + "，我在" + province + "，",
          css: [{
            top: `${startTop + 38 * gapSize}rpx`,
            // shadow: '10rpx 10rpx 5rpx #888888',
            fontWeight: 'bold',
          }, common],
        },
        {
          id: 'my-text-id',
          type: 'text',
          text: "                      点亮中南校徽，为中南庆生！",
          css: [{
            top: `${startTop + 40 * gapSize}rpx`,
            // shadow: '10rpx 10rpx 5rpx #888888',
            fontWeight: 'bold',
          }, common],
        },
        {
          id: 'my-text-id',
          type: 'text',
          text: "",
          css: [{
            top: `${startTop + 8.5 * gapSize}rpx`,
            // shadow: '10rpx 10rpx 5rpx #888888',
            fontWeight: 'bold',
          }, common],
        },
        _userImg(8, 0, '100rpx', userinfo.avatarUrl),
        _qrcode(1.5, 3, '0rpx'),
        _logo(1.5, 3, '50rpx'),
      ],
    });
  }
}

const startTop = 100;
const startLeft = 20;
const gapSize = 20;
const common = {
  left: `${startLeft}rpx`,
  fontSize: '25rpx',
  // color: "#698dff",
  color: "#9A2429",
  fontFamily: "STXihei",
  fontWeight: 'bold',
};


function _qrcode(index, rotate, borderRadius) {
  return ({
    type: 'image',
    url: '../../palette/QRpic.png',
    css: {
      top: `${startTop + 30 * gapSize}rpx`,
      left: `${startLeft + 180 * index + 80}rpx`,
      width: '120rpx',
      height: '120rpx',
      // shadow: '10rpx 10rpx 5rpx #888888',
      borderRadius: borderRadius,
    },
  });
}

function _logo(index, rotate, borderRadius) {
  return ({
    type: 'image',
    url: '../../palette/logo.png',
    css: {
      top: `${startTop - 3 * gapSize}rpx`,
      left: `${startLeft + 5 * index }rpx`,
      width: '200rpx',
      height: '50rpx',
      // shadow: '10rpx 10rpx 5rpx #888888',
    },
  });
}

function _userImg(index, rotate, borderRadius, url) {
  return ({
    type: 'image',
    url: url,
    css: {
      top: `${startTop + 30 * gapSize}rpx`,
      left: `${startLeft + 20 * index}rpx`,
      width: '120rpx',
      height: '120rpx',
      shadow: '10rpx 10rpx 5rpx #888888',
      rotate: rotate,
      borderRadius: borderRadius,
    },
  });
}

function _des(index, content) {
  const des = {
    type: 'text',
    text: content,
    css: {
      fontSize: '41rpx',
      top: `${startTop + 8.5 * gapSize + 140}rpx`,
    },
  };
  if (index === 3) {
    des.css.right = '60rpx';
  } else {
    des.css.left = `${startLeft + 120 * index + 30}rpx`;
  }
  return des;
}