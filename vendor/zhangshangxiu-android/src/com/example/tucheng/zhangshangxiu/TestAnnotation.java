package com.example.tucheng.zhangshangxiu;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

public @interface TestAnnotation {
    String value();
    String[] value2() default "value2";
}
