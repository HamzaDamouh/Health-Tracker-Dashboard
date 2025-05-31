package health.app.tracker.utils;


import lombok.Data;

@Data
public class ApiResponse<T> {
    private T data;
    private String message;
    private boolean success;

    public static <T> ApiResponse<T> success(T data, String message) {
        ApiResponse<T> res = new ApiResponse<>();
        res.setData(data);
        res.setMessage(message);
        res.setSuccess(true);
        return res;
    }

    public static ApiResponse<Void> error(String message) {
        ApiResponse<Void> res = new ApiResponse<>();
        res.setMessage(message);
        res.setSuccess(false);
        return res;
    }
}
