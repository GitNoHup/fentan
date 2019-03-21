package com.zhang.fentan.exception;

/**
 * @Description TODO
 * @Date 2019-03-21 10:34
 * @Created Mr.zhang
 */
public class AuthorException extends BaseException{
    private static final long serialVersionUID = 1L;

    private static final String ERROR_CODE = "009";

    public AuthorException() {
        super();
    }

    public AuthorException(String code, String message) {
        super(code, message);
    }

    public AuthorException(String message) {
        super(ERROR_CODE, message);
    }
}
