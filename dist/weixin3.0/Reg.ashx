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
            else context.Response.Write("错误:hum(" + context.Request["hum"] + "),<a href='/weixin3.0/index.html#/login'>返回</a>");
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