package com.property.test.web.rest;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class WeiChatResource {

    /**
     * 微信签名校验工具
     * @param requestBody
     * @return
     */
    @GetMapping("weichat")
    public String validateWriChat(@RequestBody String requestBody){
        JSONObject jsonObject = JSON.parseObject(requestBody);

        return jsonObject.getString("echostr");
    }
}
