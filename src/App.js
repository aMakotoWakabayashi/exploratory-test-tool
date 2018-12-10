import React, { Component } from 'react';
import './App.css'
import './siimple.min.css'
import Settings from './settings.js'

class App extends Component {
    
    constructor(props, context){
        super(props, context)
        this.state = {
            starttime:0,
            appli:"",
            roll:"",
            tour:"",
        }

        this.start_test = this.start_test.bind(this)
        this.make_url = this.make_url.bind(this)
        this.get_roll = this.get_roll.bind(this)
        this.get_tour = this.get_tour.bind(this)
        this.ready_test = this.ready_test.bind(this)
        this.reload = this.reload.bind(this)
    }

    componentDidMount() {
        this.setState({roll:this.get_roll()})
        this.setState({tour:this.get_tour()})
    }

    get_roll() {
        var s = new Settings()
        return s.roll()
    }

    get_tour() {
        var s = new Settings()
        return s.tour()
    }

    ready_test() {
        this.start_button.className = "siimple-btn siimple-btn--primary"
        this.starttime = 0
    }

    make_url() {      
        var appli = ""
        var finishtime = new Date()
        var testtime = finishtime - this.starttime
        var time = this.computeDuration(testtime)
        var roll = this.state.roll
        var tour = this.state.tour
        var a = encodeURIComponent(appli)
        var t = encodeURIComponent(time)
        var r = encodeURIComponent(roll)
        var o = encodeURIComponent(tour)

        var url = "https://docs.google.com/forms/d/e/1FAIpQLSfYAQA81O9-Rly-OOMmpwM4Mt7MB5OVbhcEjE3_dSjGJH3EYg/viewform?usp=pp_url&entry.2107535385=" + a + "&entry.233677277=" + t + "&entry.1423883222=" + r + "&entry.1853622759=" + o;
        window.location.href = url;
    }

    start_test() {
        if (this.start_button.className.match(/siimple-btn--disabled/)) {
            return
        }

        var t = new Date();
        this.starttime = t
        this.start_button.className = "siimple-btn siimple-btn--primary siimple-btn--disabled";
    }

    computeDuration(ms){
        var h = String(Math.floor(ms / 3600000) + 100).substring(1);
        var m = String(Math.floor((ms - h * 3600000)/60000)+ 100).substring(1);
        var s = String(Math.round((ms - h * 3600000 - m * 60000)/1000)+ 100).substring(1);
        return h+':'+m+':'+s;
    }

    reload() {
        this.setState({roll:this.get_roll()})
        this.setState({tour:this.get_tour()})
    }

    render() {
        return (
            <div className="App">
              <header className="App-header">
                <div>
                  <button className="siimple-btn siimple-btn--primary" onClick={this.ready_test}>探索的テストの準備</button>
                  <button className="siimple-btn siimple-btn--primary" onClick={this.start_test} ref={ button => {this.start_button = button} }>試験を開始する</button>
                  <button className="siimple-btn siimple-btn--primary" onClick={this.make_url}>結果を報告する</button>
                  
                </div>
              </header>


              <div className="siimple-table">
                <div className="siimple-table-header">
                  <div className="siimple-table-row">
                    <div className="siimple-table-cell">Charter</div>
                    <div className="siimple-table-cell"></div>
                    <div className="siimple-table-cell"></div>
                  </div>
                </div>
                <div className="siimple-table-body">
                  <div className="siimple-table-row">
                    <div className="siimple-table-cell">ロール</div>
                    <div className="siimple-table-cell">どんなユーザーとしてテストをするか？</div>
                    <div className="siimple-table-cell">{this.state.roll}</div>
                  </div>
                  <div className="siimple-table-row">
                    <div className="siimple-table-cell">ツアー</div>
                    <div className="siimple-table-cell">どの部分のテストを実施したいか？</div>
                    <div className="siimple-table-cell">{this.state.tour}</div>
                  </div>
                </div>
                <button className="siimple-btn siimple-btn--orange" onClick={this.reload}>チャーターを再生成</button>
              </div>
            </div>
        );
    }
}

export default App;
