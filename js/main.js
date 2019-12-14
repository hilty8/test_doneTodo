// 1, データ構造を下記のように変更する
/*
Todo: {
  // 担当者 : person in change -> PIC -> pic
  pic: 1,
  title: "",
  detail: "",
  status: 
}
const STATUS: {
  notYet: 未着手,
  working: 着手中,
  pending: 保留,
  completed: 完了

}

*/

// $(document).foundation();


// TODOリストとDONEリストを作る
// 正直データ構造と表示の仕方が違和感バリバリなので、メンバーごとに表示を変えるようにしたい
// 「全メンバー」みたいなボタンがあると、皆に表示するのが楽かもね

// まずはメンバーごとのDONEリストを表示する


let member1_todos = [
  { title: "人事評価", detail: "給与査定", isChecked: false },
  { title: "面接", detail: "圧迫面接で追い詰める", isChecked: false },
  { title: "役員会議資料作成", detail: "決算", isChecked: false },
];
let member1_doneTodos = [
  { title: "昇進したいな", detail: "社長の座を狙う_あくまで人道的にね", isChecked: false}
];
let member2_todos = [
  { title: "プロジェクトX", detail: "風の中のすばる〜♪", isChecked: false },
  { title: "進捗報告2", detail: "何の成果も！得られませんでした！", isChecked: false }
];
let member2_doneTodos = [

];
let member3_todos = [
  { title: "エクセル作成", detail: "エビデンスを貼るだけの簡単なお仕事", isChecked: false }
];
let member3_doneTodos = [
  { title: "いえーい", detail: "横領してタイ━━━||Φ|(|´|Д|`|)|Φ||━━━ホ", isChecked: false}
];
let member4_todos = [
  { title: "係長だよ", detail: "自己紹介だって仕事に入るのさ", isChecked: false }
];
let member4_doneTodos = [
  { title: "ブラック企業あるある", detail: "定時で帰る社員を引き止める_屈するな若人よ", isChecked: false}
];




var vm = new Vue({
  el: "#todo",
  data: {
    memberName: "",
    inputTitle: "",
    inputText: "",
    members: [
      {
        picID: 1,
        name: "部長",
        todos: member1_todos,
        doneTodos: member1_doneTodos,
      },
      {
        picID: 2,
        name: "課長",
        todos: member2_todos,
        doneTodos: member2_doneTodos,
      },
      {
        picID: 3,
        name: "主任",
        todos: member3_todos,
        doneTodos: member3_doneTodos,
      },
      {
        picID: 4,
        name: "係長",
        todos: member4_todos,
        doneTodos: member4_doneTodos,
      },
    ]
  },
  methods: {
    addTodo: function () {
      // 担当者が指定されていることを確認
      if(!this.memberName){
        alert('Todoの担当者を指定してください');
        return;
      }
      // 担当者のTodoリストに追加
      let member = this.members.find((member) => member.name == this.memberName);
      member.todos.push({ title: this.inputTitle, detail: this.inputText })
    },
    deletetodo: function (arg1, index) {

      // if (confirm('Todoを削除しますか？')) {
      let member = this.members.find((targetMember) => targetMember.name == arg1.name);
      console.log(member);
      member.todos.splice(index, 1);
      // }
    },
    removeSelected: function(todos, index){
      this.members[index].todos = todos.filter(el => el.isChecked != true);
    },
    removeSelectedAll: function(){
      this.members.forEach(el => {
        el.todos = el.todos.filter( todo => todo.isChecked != true)
      })
    },
    selectAll: function(){
      this.members.forEach(el => {
        el.todos.forEach(todo => todo.isChecked = true);
      })
    },
    completeTodos: function(){
      this.members.forEach(member => {
        // チェック済みリストを doneリストに追加
        member.todos.forEach(todo => {
          if(todo.isChecked == true) member.doneTodos.push(todo);
        })
        // チェック済みリストを todoリストから除去
        member.todos = member.todos.filter(todo => todo.isChecked != true);

        // TODOリスト、DONEリストのチェックを解除する
        this.unsetCheck();
      })
    },
    restoreTodo: function(name, doneTodo, index){
      let member = this.members.find((el) => el.name == name);
      member.todos.push(doneTodo);
      member.doneTodos.splice(index, 1);
      this.unsetCheck();
    },
    unsetCheck: function(){
      this.members.forEach(member => {
        member.todos.forEach(todo => todo.isChecked = false);
        member.doneTodos.forEach(doneTodo => doneTodo.isChecked = false);
      })
    },
    
    restoreTodoAll: function(){
      this.members.forEach(member => {
        // メンバーごとに、doneTodoのうちチェックがついているものを、Todoリストに戻す
        let doneTodosChecked = member.doneTodos.filter(el => el.isChecked == true);
        doneTodosChecked.forEach(el => member.todos.push(el));

        // member.doneTodos.filter(el => el.isChecked == true).forEach(el => {
        //   member.todos.push(el);
        // })

        // メンバーごとに、doneTodoのうちチェックがついているものを省く
        member.doneTodos = member.doneTodos.filter(el => el.isChecked == false);
      })

      // 全メンバーの移動が終わったら、全TODOのisChecked を外す
      this.unsetCheck();

    }

  }
});
