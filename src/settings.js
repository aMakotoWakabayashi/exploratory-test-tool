import React from 'react'

// ロールの設定
// ロール：重み付け、で設定可能
// 0 にするとその項目は選ばれない。
const rolls = {
    'サラリーマン': 5,
    'OL': 5,
    '男子学生': 5,
    '女子学生':0,
    '男子児童':0,
    '女子児童':0
}
// ツアーの設定
// ツアー名：重み付け、で設定可能
// 0 にするとその項目は選ばれない。
const tours = {
    'ビューアーの広告表示':0,
    'ビューアー':0,
    'レンタルした際の動作確認':0,
    'チュートリアルをみながらアプリがそのとおりに動作しているかどうか':0,
    '一回目無料、古いアプリから対応版への上書きインストール、TOP画面動的対応、ジャンプ画面でのバナー':10
}

// バックグラウンドの設定
// 試験するアプリで知っておくべき情報などを記載。
const background = "https://acsmine.tok.access-company.com/redmine/projects/publus-client-v2_jplus/issues?utf8=%E2%9C%93&set_filter=1&sort=id%3Adesc&f%5B%5D=status_id&op%5Bstatus_id%5D=o&f%5B%5D=fixed_version_id&op%5Bfixed_version_id%5D=%3D&v%5Bfixed_version_id%5D%5B%5D=5121&v%5Bfixed_version_id%5D%5B%5D=5715&v%5Bfixed_version_id%5D%5B%5D=5720&f%5B%5D=&c%5B%5D=tracker&c%5B%5D=subject&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=assigned_to&c%5B%5D=due_date&c%5B%5D=updated_on&group_by=&t%5B%5D="

// フォーム入力先の Google Form への URL
const FORMURL = "https://docs.google.com/forms/d/e/1FAIpQLSfYAQA81O9-Rly-OOMmpwM4Mt7MB5OVbhcEjE3_dSjGJH3EYg/viewform"

export default class Settings extends React.Component {
    
    static background() {
        return background
    }

    static form_url() {
        return FORMURL
    }
   
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
