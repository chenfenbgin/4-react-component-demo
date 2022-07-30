import "./index.css";
import avatar from "./images/avatar.png";
import React from "react";
// 使用uuid，通过它叫v4，我们将其重命名一下
import { v4 as uuid } from "uuid";

// 时间格式化
function formatDate(time) {
  return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`;
}

class App extends React.Component {
  state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
      {
        id: 1,
        name: "热度",
        type: "hot",
      },
      {
        id: 2,
        name: "时间",
        type: "time",
      },
    ],
    active: "hot",
    list: [
      {
        id: 1,
        author: "刘德华",
        comment: "给我一杯忘情水",
        time: new Date("2021-10-10 09:09:00"),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1,
      },
      {
        id: 2,
        author: "周杰伦",
        comment: "哎哟，不错哦",
        time: new Date("2021-10-11 09:09:00"),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0,
      },
      {
        id: 3,
        author: "五月天",
        comment: "不打扰，是我的温柔",
        time: new Date("2021-10-11 10:09:00"),
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1,
      },
    ],
    comment: "请输入内容", // 评论里面的内容
  };

  // tab切换回调
  switchTab = (type) => {
    console.log("切换", type);
    // 思路：点击谁就把谁的type属性交给state中的active
    this.setState({
      active: type,
    });
  };
  // 受控组件的回调
  textareaChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };
  // 发表评论组件的回调
  submitComment = () => {
    // 提交评论 state.list 后面添加一项新的内容
    this.setState({
      list: [
        ...this.state.list,
        {
          id: uuid(), // 独一无二的值 ？
          author: "狠人大帝",
          comment: this.state.comment,
          time: new Date(),
          // 1: 点赞 0：无态度 -1:踩
          attitude: 0,
        },
      ],
    });
  };
  // 删除评论的回调
  delComment = (id) => {
    console.log(id);
    this.setState({
      list: this.state.list.filter((item) => item.id !== id),
    });
  };

  // 切换喜欢
  toggleLike = (curItem) => {
    // 逻辑： 如果是1，就改为 0 ，否则改为1   - attitude
    console.log(curItem);
    // attitude id，作为修改谁的判断条件
    const { attitude, id } = curItem;
    this.setState({
      list: this.state.list.map((item) => {
        // 判断条件 如果item.id === id , 把item的attitude属性修改一下
        // 否则就原样
        if (item.id === id) {
          return {
            ...item,
            attitude: item.attitude === 1 ? 0 : 1,
          };
        } else {
          return item;
        }
      }),
    });
  };
  render() {
    return (
      <div className="App">
        <div className="comment-container">
          {/* 评论数 */}
          <div className="comment-head">
            <span>5 评论</span>
          </div>
          {/* 排序 */}
          <div className="tabs-order">
            <ul className="sort-container">
              {this.state.tabs.map((tab) => (
                <li
                  onClick={() => this.switchTab(tab.type)}
                  key={tab.id}
                  className={tab.type === this.state.active ? "on" : ""}
                >
                  按{tab.name}排序
                </li>
              ))}
            </ul>
          </div>

          {/* 添加评论 */}
          <div className="comment-send">
            <div className="user-face">
              <img className="user-head" src={avatar} alt="" />
            </div>
            <div className="textarea-container">
              {/* 输入框 受控组件 */}
              <textarea
                cols="80"
                rows="5"
                placeholder="发条友善的评论"
                className="ipt-txt"
                value={this.state.comment}
                onChange={this.textareaChange}
              />
              <button className="comment-submit" onClick={this.submitComment}>
                发表评论
              </button>
            </div>
            <div className="comment-emoji">
              <i className="face"></i>
              <span className="text">表情</span>
            </div>
          </div>

          {/* 评论列表 */}
          <div className="comment-list">
            {this.state.list.map((item) => (
              <div className="list-item" key={item.id}>
                <div className="user-face">
                  <img className="user-head" src={avatar} alt="" />
                </div>
                <div className="comment">
                  <div className="user">{item.author}</div>
                  <p className="text">{item.comment}</p>
                  <div className="info">
                    <span className="time">{formatDate(item.time)}</span>
                    <span
                      onClick={() => this.toggleLike(item)}
                      className={item.attitude === 1 ? "like liked" : "like"}
                    >
                      <i className="icon" />
                    </span>
                    <span
                      className={item.attitude === -1 ? "hate hated" : "hate"}
                    >
                      <i className="icon" />
                    </span>
                    <span
                      className="reply btn-hover"
                      onClick={() => this.delComment(item.id)}
                    >
                      删除
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
