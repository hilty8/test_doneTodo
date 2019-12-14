// TODOリストとDONEリストを作る
// 正直データ構造と表示の仕方が違和感バリバリなので、メンバーごとに表示を変えるようにしたい
// 「全メンバー」みたいなボタンがあると、皆に表示するのが楽かもね

// まずはメンバーごとのDONEリストを表示する



// $(document).foundation();

let member1_todos = [
  { title: "人事評価", text: "給与の査定", isChecked: false },
  { title: "面接", text: "田中さん", isChecked: false },
  { title: "役員会議資料作成", text: "決算", isChecked: false },
];
let member1_doneTodos = [
  { title: "昇進したいな", text: "社長の座を狙う_あくまで人道的にね", isChecked: false}
];
let member2_todos = [
  { title: "課長_title", text: "課長_text_給与査定", isChecked: false},
  { title: "進捗報告1", text: "Aプロジェクト", isChecked: false }
];
let member2_doneTodos = [

];
let member3_todos = [
  { title: "エクセル作成", text: "整理する", isChecked: false }
];
let member3_doneTodos = [
  { title: "いえーい", text: "横領してタイ━━━||Φ|(|´|Д|`|)|Φ||━━━ホ", isChecked: false}
];
let member4_todos = [
  { title: "係長だよ", text: "ほえー", isChecked: false }
];
let member4_doneTodos = [
  { title: "ブラック企業あるある", text: "定時で帰る社員を引き止める_屈するな若人よ", isChecked: false}
];




var vm = new Vue({
  el: "#todo",
  data: {
    memberName: "",
    inputTitle: "タイトル(仮)",
    inputText: "テキストを入力する",
    members: [
      {
        name: "部長",
        todos: member1_todos,
        doneTodos: member1_doneTodos,
      },
      {
        name: "課長",
        todos: member2_todos,
        doneTodos: member2_doneTodos,
      },
      {
        name: "主任",
        todos: member3_todos,
        doneTodos: member3_doneTodos,
      },
      {
        name: "係長",
        todos: member4_todos,
        doneTodos: member4_doneTodos,
      },
    ]
  },
  methods: {
    addTodo: function () {
      let member = this.members.find((member) => member.name == this.memberName);
      member.todos.push({ title: this.inputTitle, text: this.inputText })
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
    doneTask: function(){
      
    },
    restoreTodo: function(name, doneTodo, index){
      let member = this.members.find((el) => el.name == name);
      member.todos.push(doneTodo);
      member.doneTodos.splice(index, 1);
    }
  }
});
