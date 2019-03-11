package com.zhang.fentan.util;

import java.lang.reflect.Field;

/**
 * @Description TODO
 * @Date 2019-03-11 13:47
 * @Created Mr.zhang
 */
public class ReflectionUtil {

    /**
     * 直接设置对象属性值, 无视private/protected修饰符, 不经过setter函数.
     */
    public static void setFieldValue(final Object obj, final String fieldName, final Object value) {
        Field field = ClassUtil.getAccessibleField(obj.getClass(), fieldName);
        if (field == null) {
            throw new IllegalArgumentException("Could not find field [" + fieldName + "] on target [" + obj + ']');
        }
        setField(obj, field, value);
    }

    /**
     * 使用已获取的Field, 直接读取对象属性值, 不经过setter函数.
     */
    public static void setField(final Object obj, Field field, final Object value) {
        try {
            field.set(obj, value);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }

    }
}
