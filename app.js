// 【はじめに】
// TODOはjsでのDOM操作の全てが詰まっている
// イベントセット、要素の取得、追加、削除、変更、表示、非表示、アニメーション
// デザイン上のクラス名とjs操作用のクラス名は分けること！

// 【やること】
// 1. TODOを追加を押下した際にタスクを追加する
// 2. TODOタスクのアイコンを押下した際にタスクをDONEにする
// 3. DONEタスクのアイコンを押下した際にタスクをTODOタスクに戻す
// 4. ゴミ箱アイコンを押下した際にタスクを削除する
// 5. TODOタスクのテキストをクリックした際に入力できるようにし、shift+Enterで修正を確定する
// 6. 検索エリアに値を入力した際にタスクの中から値にマッチするタスクのみ表示させる


//【1. TODOを追加を押下した際にタスクを追加する】
// 1. 「TODOを追加」ボタンを押下した際にイベントを発火
// 2. inputの値を取得（取得したらクリアする）
// 3. inputの値をlistのitemに追加する（DOM生成）
$('.js-todo-add').on('click', function(e) {

  // submitの操作を指定していないため、ボタン押下時に自分自身に遷移していまう
  // そうすると入力フォームがクリアされてしまうため、イベントをキャンセルする必要がある
  e.preventDefault();

  // inputの値を取得し、中身を空にする
  var val = $('.js-todo-add-item').val();
  $('.js-todo-add-item').val('');


  // 入力が空の場合
  if(val == ''){

    // エラーを表示
    $('.js-input-error').show();

  }else {

  // エラーを隠す（表示されているかもしれないので）
    $('.js-input-error').hide();

  // listItemのhtmlを生成してタスクに追加する
    var item = '<li class="list__item js-search-target" data-text="'+ val +'">'
              + '<i class="fa fa-square-o icon-check js-click-done" aria-hidden="true"></i>'
              + '<span class="text js-click-text">'+ val +'</span>'
              + '<input type="text" class="editText js-click-text-target" value="'+ val +'">'
              + '<i class="fa fa-trash icon-trash js-click-trash" aria-hidden="true"></i>'
              + '</li>';
    $('.js-list-target').prepend(item);

  }
});

//【2. TODOタスクのアイコンを押下した際にタスクをDONEにする】
// 1. TODOタスクのアイコンを押下した際にイベントを発火
// 2. クリックしたDOM（アイコン）をdoneのアイコンに変更
// 3. クリックしたDOM（アイコン）にjs-click-doneのクラス名を削除し、js-click-todoのクラス名をつける
// 4. クリックしたDOM（アイコン）から辿って、list__itemのDOMを取得
// 5. list__itemのクラス名をdoneのものに変更する
$(document).on('click', '.js-click-done' , function (e) {
  $(this).removeClass('fa-square-o').addClass('fa-check-square');
  $(this).removeClass('js-click-done').addClass('js-click-todo');
  $(this).parent().addClass('list__item--done');
});

  // parentは１階層上の〜という探し方
  // closestは一番近い親の〜という探し方

//【3. DONEタスクのアイコンを押下した際にタスクをTODOタスクに戻す】
// 1. DONEタスクのアイコンを押下した際にイベントを発火
// 2. クリックしたDOM（アイコン）をtodoのアイコンに変更
// 3. クリックしたDOM（アイコン）にjs-click-doneのクラス名を追加し、js-click-todoのクラス名を削除する
// 4. クリックしたDOM（アイコン）から辿って、list__itemのDOMを取得
// 5. list__itemのクラス名をtodoのものに変更する
$(document).on('click', '.js-click-todo' , function (e) {
  $(this).addClass('fa-square-o').removeClass('fa-check-square');
  $(this).addClass('js-click-done').removeClass('js-click-todo');
  $(this).parent().removeClass('list__item--done');
});



//【4. ゴミ箱アイコンを押下した際にタスクを削除する】
// 1. ゴミ箱アイコンを押下した際にイベントを発火
// 2. クリックしたDOM（アイコン）から辿って、list__itemのDOMを取得し、削除する
$(document).on('click', '.js-click-trash', function () {

  // $(this).parent().remove();

  $(this).parent().fadeOut('slow', function () {

    $(this).remove();

  })

});



//【5. TODOタスクのテキストをクリックした際に入力できるようにし、修正可能にする】
// 1. テキストを押下した際にイベントを発火
// 2. クリックしたDOM（テキスト）を非表示にし、兄弟要素の編集エリアを表示する
$(document).on('click', '.js-click-text', function () {

  $(this).hide().siblings('.js-click-text-target').show().select();

});


// 3. 編集エリア内でkeyupしたらイベントを発火
// 4. Shift+Enterを押したら、値をテキストにも反映し、編集エリアは非表示、テキストは表示する
// Enterのみにしてしまうと、日本語変換時にもイベントが発火してしまうためShist + Enter としている
$(document).on('keyup', '.js-click-text-target', function (e) {
  if( e.key === 'Enter' && e.shiftKey){
    var myDom = $(this);
    myDom.hide().siblings('.js-click-text').text(myDom.val()).show()
        .parent().data('text', myDom.val());
    // data属性を操作する場合、data()とattr()でのやり方がある
    // data()は、jQueryオブジェクト内のdataプロパティに対しての操作になる（htmlには反映されない）
    // attr()は、htmlオブジェクト（DOM）に対しての操作になる
  }
});



//【6. 検索エリアに値を入力した際にタスクの中から値にマッチするタスクのみ表示させる】
// 1. 検索エリアに入力があった際にイベントを発火
// 2. 全てのlist__itemのDOMを取得し、一つ一つループで展開
// 3. 値にマッチするもの以外を非表示にする
// changeの場合はフォーカスアウトでイベントが走るので、リアルタイムならkeyupを使う
$(document).on('keyup', '.js-input-search', function (e) {
  var searchVal = $(this).val();  // 検索文字列を変数に格納

  $('.js-search-target').show().each(function () {
    var text = $(this).data('text');  // 検索対象のdata-text属性の値を変数に格納
    var regexp = new RegExp('^' + searchVal + '[a-zA-Z0-9]*');  // 正規表現のオブジェクトを作成（前方一致）

    if (!text.match(regexp)) {
      $(this).hide(); // 検索文字と一致しない場合は非表示

    } else {
      return true;

    }
  })
});
