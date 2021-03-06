import React, { Component } from 'react';
import './App.css'
import './siimple.min.css'
import Settings from './settings.js'

function ms_to_hms(ms){
    var h = String(Math.floor(ms / 3600000) + 100).substring(1);
    var m = String(Math.floor((ms - h * 3600000)/60000)+ 100).substring(1);
    var s = String(Math.round((ms - h * 3600000 - m * 60000)/1000)+ 100).substring(1);
    return h+':'+m+':'+s;
}
const START_BTN_VALUE = "試験を開始する"

class App extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            starttime:0,
            appli:"",
            roll:"",
            tour:"",
            background:"",
            start_btn_text:START_BTN_VALUE,
            tid:0
        }

        this.start_test = this.start_test.bind(this)
        this.make_url = this.make_url.bind(this)
        this.get_roll = this.get_roll.bind(this)
        this.get_tour = this.get_tour.bind(this)
        this.get_background = this.get_background.bind(this)
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

    get_background() {
        var s = new Settings()
        return s.background()
    }

    ready_test() {
        clearInterval(this.tid)
        this.start_button.className = "siimple-btn siimple-btn--primary"
        this.setState({starttime:0})
        this.setState({start_btn_text:START_BTN_VALUE})
    }

    make_url() {
        clearInterval(this.tid)
        var appli = ""
        let finishtime = new Date()
        var testtime = finishtime - this.starttime
        let time = ms_to_hms(testtime)
        var roll = this.state.roll
        var tour = this.state.tour
        let day = `${finishtime.getFullYear()}-${finishtime.getMonth() + 1}-${finishtime.getDate()}`
        var a = encodeURIComponent(appli)
        var t = encodeURIComponent(time)
        var r = encodeURIComponent(roll)
        var o = encodeURIComponent(tour)
        let d = encodeURIComponent(day)
        var url = Settings.form_url() + "?usp=pp_url&entry.2107535385=" + a + "&entry.233677277=" + t + "&entry.1423883222=" + r + "&entry.1853622759=" + o + "&entry.885077988=" + d
        window.location.href = url;
    }

    start_test() {
        if (this.start_button.className.match(/siimple-btn--disabled/)) {
            return
        }

        var t = new Date();
        this.starttime = t
        this.setState({starttime:t})
        this.start_button.className = "siimple-btn siimple-btn--primary siimple-btn--disabled";
        let p = this
        this.tid = setInterval(function(){
            let n = new Date()
            let testtime = n - p.state.starttime
            p.setState({start_btn_text:ms_to_hms(testtime)})
        }, 1000, p)
    }

    reload() {
        this.setState({roll:this.get_roll()})
        this.setState({tour:this.get_tour()})
    }

    render() {
        return (
            <div className="App">
              <header className="App-header">
                <h1 className="siimple-h1">探索的テスト支援ツール</h1>
                <div>
                  <button className="siimple-btn siimple-btn--primary" onClick={this.ready_test}>リセット</button>
                  <button className="siimple-btn siimple-btn--primary" onClick={this.start_test} ref={ button => {this.start_button = button} }>{this.state.start_btn_text}</button>

                  <button className="siimple-btn siimple-btn--success" onClick={this.make_url}>結果を報告する</button>
                  
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
                    <div className="siimple-table-cell">Roll</div>
                    <div className="siimple-table-cell">どんなユーザーとしてテストをするか？</div>
                    <div className="siimple-table-cell">{this.state.roll}</div>
                  </div>
                  <div className="siimple-table-row">
                    <div className="siimple-table-cell">Tour</div>
                    <div className="siimple-table-cell">どの部分のテストを実施したいか？</div>
                    <div className="siimple-table-cell">
                      <pre>
                        {this.state.tour}
                      </pre>
                    </div>
                  </div>
                  <div className="siimple-table-row">
                    <div className="siimple-table-cell">Background</div>
                    <div className="siimple-table-cell">テストを実施するにあたって知っておくツアーの背景</div>
                    <div className="siimple-table-cell siimple-content">
                      <pre>
            {Settings.background()}
                      </pre>
                    </div>
                  </div>

                </div>
                <button className="siimple-btn siimple-btn--orange" onClick={this.reload}>チャーターを再生成</button>
              </div>
            </div>
        );
    }
}

export default App;
