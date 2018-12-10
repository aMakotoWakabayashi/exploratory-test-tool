import React from 'react'

// ロールの設定
// ロール：重み付け、で設定可能
const rolls = {
    'サラリーマン': 5,
    'OL': 1,
    '男子学生': 10,
    '女子学生':1,
    '男子児童':3,
    '女子児童':1
}

// ツアーの設定
// ツアー名：重み付け、で設定可能
const tours = {
    'ビューアーの広告表示':10,
    'ビューアー':1,
    'レンタルした際の動作確認':2,
    'チュートリアルをみながらアプリがそのとおりに動作しているかどうか':1
}

export default class Settings extends React.Component {

    roll() {
        return this.pick(rolls)
    }

    tour() {
        return this.pick(tours)
    }

    pick(w) {
        // refere: https://qiita.com/die10jp/items/daf92adaecf177d299ce
        const throwDarts = w => {
            const hit = rand(1, dartboard(w));
            return dartboard(w, hit);
        }

        const dartboard = (w, hit) => {
            let area = 0;
            for (let k in w) {
                area += w[k];
                if (hit && (area >= hit)) return k;
            };
            return area;
        }

        const rand = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        return throwDarts(w)
    }
}
