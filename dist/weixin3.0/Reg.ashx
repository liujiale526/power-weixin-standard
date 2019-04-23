<%@ WebHandler Language="C#" Class="Reg" %>
using System;
using System.Web;
public class Reg : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        if ((context.Request["hum"] != null && context.Request["hum"].ToString().Length > 0) && (context.Request["code"] != null && context.Request["code"].ToString().Length > 0))
        {
            string HumId = context.Request["hum"];
            string WCode = context.Request["code"];
            string WToken = Senparc.Weixin.QY.CommonAPIs.AccessTokenContainer.TryGetToken(wc.QY.AppId, wc.QY.AppSecret);
            var obj = Senparc.Weixin.QY.AdvancedAPIs.OAuth2.GetUserId(WToken, WCode, wc.QY.AgentId ?? 0);
            if (obj.errmsg.ToString().ToLower() == "ok")
            {
                Power.Systems.StdSystem.HumanBO bo = Power.Systems.StdSystem.HumanBO.FindByKey(HumId);
                if (bo != null)
                {
                    bo.SetItem("WeChat", obj.UserId);
                    bo.Save(System.ComponentModel.DataObjectMethodType.Update);
                    context.Response.Redirect("/weixin3.0/index.html");
                }
                else
                {
                    if (HumId.ToUpper() == "AD000000-0000-0000-0000-000000000000")//admin账户如果没有人员信息就跳过
                        context.Response.Redirect("/weixin3.0/index.html");
                    else
                        context.Response.Write("错误:HumanBO(" + HumId + "),<a href='/weixin3.0/index.html#/login'>返回</a>");
                }
            }
            else context.Response.Write("错误:" + obj.errcode + "/" + obj.errmsg + ",<a href='/weixin3.0/index.html#/login'>返回</a>");
        }
        else if (context.Request["code"] != null && context.Request["code"].ToString() != "")
        {
            //有code时，直接绑定
            string WCode = context.Request["code"];
            string WToken = Senparc.Weixin.QY.CommonAPIs.AccessTokenContainer.TryGetToken(wc.QY.AppId, wc.QY.AppSecret);
            Senparc.Weixin.QY.AdvancedAPIs.GetUserIdResult us = Senparc.Weixin.QY.AdvancedAPIs.OAuth2.GetUserId(WToken, WCode, wc.QY.AgentId ?? 0);
            //string returnText = Senparc.Weixin.HttpUtility.RequestUtility.HttpGet("https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token="+WToken+"&code="+WCode,null);

            //System.Collections.Hashtable ht = Newtonsoft.Json.JsonConvert.DeserializeObject<System.Collections.Hashtable>(returnText);
            string wechatCode = us.UserId;

            XCode.EntityList<Power.Systems.StdSystem.HumanDO> list = Power.Systems.StdSystem.HumanDO.FindAll("WeChat='" + wechatCode + "'", "", "");

            if (list.Count != 1)
            {
                context.Response.Write("1错误:WeChat(" + wechatCode + "),<a href='/weixin3.0/index.html#/login'>返回</a>");
                return;
            }
            Power.Systems.StdSystem.HumanDO human = list[0];
            if (human != null)
            {
                XCode.EntityList<Power.Systems.StdSystem.UserDO> userList = Power.Systems.StdSystem.UserDO.FindAll("HumanId='" + human.Id.ToString() + "'", "", "");
                if (userList.Count == 0)
                {
                    context.Response.Write("2错误用户:WeChat(" + wechatCode + "),<a href='/weixin3.0/index.html#/login'>返回</a>");
                    return;
                }
                Power.Systems.StdSystem.UserDO user = userList[0];
                Power.Controls.Weixin.Hoter hoter = new Power.Controls.Weixin.Hoter();
                string rs = hoter.LoginCode(user.Code, "zh-CN");
                Power.Global.ViewResultModel result = Newtonsoft.Json.JsonConvert.DeserializeObject<Power.Global.ViewResultModel>(rs);
                context.Response.Redirect("/weixin3.0/index.html#/redirect?token=" + result.data["token"].ToString());
            }
            else
            {
                context.Response.Write("3错误:WeChat(" + wechatCode + "),<a href='/weixin3.0/index.html#/login'>返回</a>");
            }
        }
        else
        {
            if (context.Request["hum"] != null && context.Request["hum"].ToString().Length > 0)
            {
                string HumId = context.Request["hum"];
                Power.Systems.StdSystem.HumanBO bo = Power.Systems.StdSystem.HumanBO.FindByKey(HumId);
                if (bo != null)
                {
                    if (bo.WeChat != null && bo.WeChat.Length > 0)
                        context.Response.Redirect("/weixin3.0/index.html");
                    else
                    {
                        string path = wc.PMSUrl + "/weixin3.0/Reg.ashx?hum=" + context.Request["hum"].ToString();
                        path = HttpUtility.UrlEncode(path);
                        context.Response.Redirect("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + wc.QY.AppId + "&redirect_uri=" + path + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect");
                    }
                }
                else context.Response.Write("错误:HumanBO(" + HumId + "),<a href='/weixin3.0/index.html#/login'>返回</a>");
            }
            else
            {
                string path = wc.PMSUrl + "/weixin3.0/Reg.ashx";
                path = HttpUtility.UrlEncode(path);
                context.Response.Redirect("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + wc.QY.AppId + "&redirect_uri=" + path + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect");
            }
            //else context.Response.Write("错误:hum(" + context.Request["hum"] + "),<a href='/weixin3.0/index.html#/login'>返回</a>");
        }
    }

    private Power.Configure.WeiXinConfig wc = Power.Configure.WeiXinConfig.GetConfig("");

    public bool IsReusable
    {
        get
        {
            return true;
        }
    }

}