# Hướng Dẫn Sửa Lỗi 404 Trên Vercel

Lỗi **404: NOT_FOUND** trên Vercel thường xảy ra do ứng dụng không thể khởi động vì thiếu biến môi trường (Environment Variables).

## Bước 1: Cấu Hình Biến Môi Trường

1.  Truy cập [Vercel Dashboard](https://vercel.com/dashboard).
2.  Chọn dự án **cine-track-pro**.
3.  Vào tab **Settings** > **Environment Variables**.
4.  Thêm 2 biến sau (lấy giá trị từ file `.env.local` trong máy của bạn):

    *   **Key**: `NEXT_PUBLIC_SUPABASE_URL`
    *   **Value**: `https://sqeyybvjdrwjvvxtyhqu.supabase.co`

    *   **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    *   **Value**: (Copy giá trị dài bắt đầu bằng `eyJ...` từ file `.env.local`)

## Bước 2: Redeploy (Quan Trọng)

Sau khi thêm biến môi trường, bạn **BẮT BUỘC** phải deploy lại để áp dụng thay đổi:

1.  Vào tab **Deployments** trên Vercel.
2.  Chọn deployment gần nhất (đang bị lỗi hoặc failed).
3.  Bấm vào dấu 3 chấm (...) hoặc nút **Redeploy**.
4.  Chờ quá trình build hoàn tất.

Sau khi build xong, trang web sẽ hoạt động bình thường.

## Cảnh Báo: Failed to fetch git submodules

Nếu bạn thấy cảnh báo: `Warning: Failed to fetch one or more git submodules`

1.  **Đừng lo lắng**: Đây thường là do Vercel lưu cache của lần build trước.
2.  **Nếu Build Thành Công**: Bạn có thể bỏ qua cảnh báo này.
3.  **Nếu Build Thất Bại**:
    *   Hãy thử **Redeploy** với tùy chọn **"Use existing Build Cache"** bỏ chọn (nếu có).
    *   Hoặc push một commit rỗng để ép build lại từ đầu:
        ```bash
        git commit --allow-empty -m "Trigger rebuild"
        git push
        ```

## Cảnh Báo: Build Completed in [26ms] (Quá nhanh)

Nếu build xong quá nhanh (vài chục ms) mà không có lỗi, nhưng web trắng trơn hoặc 404:
**Nguyên nhân**: Vercel không tìm thấy code Next.js vì nó nằm trong thư mục con `cine-track-pro`.

**Cách khắc phục**:
1.  Vào **Settings** > **General** trên Vercel.
2.  Tìm mục **Root Directory**.
3.  Bấm **Edit** và nhập: `cine-track-pro`.
4.  Bấm **Save**.
5.  Vào tab **Deployments** và **Redeploy**.
