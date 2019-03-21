package com.zhang.fentan.exception;

/**
 * @Description BaseException
 * @Date 2019-03-21 10:32
 * @Created Mr.zhang
 */
public abstract class BaseException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    protected String code = "006";

    public BaseException() {
    }

    public BaseException(String message) {
        super(message);
    }

    public BaseException(String code, String message) {
        super(message);
        this.code = code;
    }

    public String getCode() {
        return this.code;
    }
}
