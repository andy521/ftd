var url=path+"/company/queryPageList";
var totalurl=path+"/company/queryByCount";
var deleteurl = path+"/company/batchDelete";
var viewDetail = path+"/company/view"
//初始化分页
$(function(){
    var addHtml = function(json){
        var html = "";
        var datas = json.data;
        //表头
        html +="<tr><td style='text-align: center;'><input type='checkbox' name='' id='' value='' /></td><td>序号</td>"+
                "<td>企业名称</td>"+
                "<td>归属类型</td>"+
                "<td>统一社会信用代码</td>"+
                "<td>成立日期</td>"+
                "<td>联系人</td>"+
                "<td>联系方式</td>"+
                "<td>创建时间</td>"+
                "<td>修改时间</td>"+
                "<td>操作</td></tr>"
        for (var i in datas) {
            var d = datas[i];
            var index = parseInt(i) + 1;
            html += "<tr> <td><input name='pageCheckBox' type='checkbox' value='"+d.id+"'></td><td>" + index + "</td>" +
                    "<td>" + d.name + "</td>" +
                    "<td>" + d.belongType + "</td>" +
                    "<td>" + d.unifiedSocialCreditCode + "</td>" +
                    "<td>" + d.establishmenDate + "</td>" +
                    "<td>" + d.linkman + "</td>" +
                    "<td>" + d.linkWay + "</td>" +
                    "<td>" + d.createTime + "</td>" +
                    "<td>" + d.updateTime + "</td>" +
                    "<td style='text-align:center'><a href='#' onclick=Details('"+d.id+"')><img src='"+path+"/static/img/icon/query.png' alt='查看详情' title='查看详情'/></a></td>" + "</tr>";
        }
        return html;
    }
    $(document).PaginBar('demo7','list',"tableFrom",10,1,url,totalurl,addHtml);
    queryPageCount();
});


function Details(id) {
    layer.open({
        type : 2
        ,title : "查看详情" // 不显示标题栏
        ,area : [ '100%', '100%' ]
        ,content : viewDetail + '?id=' + id
    });
}
// 获取选中的数据
function getSelectOption(){
    var length = $('input:checkbox[name=pageCheckBox]:checked').length;
    if( length > 1){
        layer.alert("请选择一条记录进行编辑!", {
            title: '提示信息',
        })
        return;
    }else if(length == 0){
        layer.alert("请选择一条记录进行编辑!", {
            title: '提示信息',
        })
        return;
    }else{
        var id = $('input:checkbox[name=pageCheckBox]:checked').val();
        return id;
    }
}
/**
 * 删除记录
 */
function deleteById(){
    var param = [];
    $('input:checkbox[name=pageCheckBox]:checked').each(function(){
        var value = $(this).val();
        if(value != undefined && value != null && value != ""){
            param.push(value);
        }
    });
    if(param.length > 0 && param.length < 10){
        var p = $.post(deleteurl,{id:param},function(json){
            if(json.errorcode == 0){
                layer.alert("删除成功!!", {
                    title: '提交结果',
                    cancel: function(index, layero){
                        queryPageCount();
                        return true;
                    },
                    yes: function(index, layero){
                        layer.close(index); //如果设定了yes回调，需进行手工关闭
                        queryPageCount();
                    }
                })
            }else{
                layer.alert(json.message, {
                    title: '提交结果'
                })
            }
        },"json").error(function(){
            layer.alert("请求失败请稍后重试!!");
        },"json");
    }
}
