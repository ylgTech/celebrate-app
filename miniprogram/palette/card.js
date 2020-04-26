export default class LastMayday {
  palette(userinfo, province, count) {

    return ({
      width: '670rpx',
      height: '1190rpx',
      background: '../../palette/sharebk.jpg',
      views: [{
          id: 'my-text-id',
          type: 'text',
          text: "",
          css: [{
            top: `${startTop + 20 * gapSize}rpx`,
            // shadow: '10rpx 10rpx 5rpx #888888',
            fontWeight: 'normal',
            color:'white',
            fontFamily: "仿宋",
          }, common],
        },
        {
          id: 'my-text-id',
          type: 'text',
          text: "",
          css: [{
            top: `${startTop + 7.0 * gapSize}rpx`,
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
        _userImg(3, 0, '100rpx', userinfo.avatarUrl),
        _qrcode(1.5, 3, '100rpx'),
      ],
    });
  }
}

const startTop = 100;
const startLeft = 20;
const gapSize = 20;
const common = {
  left: `${startLeft}rpx`,
  fontSize: '35rpx',
  // color: "#698dff",
  color: "#FFDEAD",
  // fontFamily: "STFangsong",
  // fontWeight: 'bold',
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

function _userImg(index, rotate, borderRadius, url) {
  return ({
    type: 'image',
    url: url,
    css: {
      top: `${startTop + 2.5 * gapSize}rpx`,
      left: `${startLeft + 14 * index}rpx`,
      width: '130rpx',
      height: '130rpx',
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