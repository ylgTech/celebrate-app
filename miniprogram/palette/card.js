export default class LastMayday {
  palette(userinfo) {
    
    return ({
      width: '670rpx',
      height: '1000rpx',
      background: '../../palette/sharebk.jpg',
      views: [
        {
          id: 'my-text-id',
          type: 'text',
          text: "    我是" + userinfo.nickName,
          css: [{
            top: `${startTop + 5.5 * gapSize}rpx`,
            // shadow: '10rpx 10rpx 5rpx #888888',
            fontWeight: 'bold',
          }, common],
        },
        {
          id: 'my-text-id',
          type: 'text',
          text: "    我在这里",
          css: [{
            top: `${startTop + 7.0 * gapSize}rpx`,
            // shadow: '10rpx 10rpx 5rpx #888888',
            fontWeight: 'bold',
          }, common],
        },
        {
          id: 'my-text-id',
          type: 'text',
          text: "    为祖国献旗",
          css: [{
            top: `${startTop + 8.5 * gapSize}rpx`,
            // shadow: '10rpx 10rpx 5rpx #888888',
            fontWeight: 'bold',
          }, common],
        },
       
        _image(3, 0, '100rpx'),
        _userImg(3, 0, '100rpx', userinfo.avatarUrl),
      ],
    });
  }
}

const startTop = 100;
const startLeft = 20;
const gapSize = 50;
const common = {
  left: `${startLeft}rpx`,
  fontSize: '35rpx',
  // color: "#698dff",
  color: "#FFDEAD",
  // fontFamily: "STFangsong",
  // fontWeight: 'bold',
};


function _image(index, rotate, borderRadius) {
  return (
    {
      type: 'image',
      url: '../../palette/fake.jpg',
      css: {
        top: `${startTop + 15 * gapSize}rpx`,
        left: `${startLeft + 158 * index}rpx`,
        width: '130rpx',
        height: '130rpx',
        // shadow: '10rpx 10rpx 5rpx #888888',
        rotate: rotate,
        borderWidth: '2rpx',
        borderColor: '#fff',
        borderRadius: borderRadius,
      },
    }
  );
}

function _userImg(index, rotate, borderRadius, url) {
  return (
    {
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
    }
  );
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
