export const NotFound = () => {
    return (
        <div className="container-fluid">
            <div className="text-center">
                <div className="error mx-auto" data-text={404}>404</div>
                <p className="lead text-gray-800 mb-5">Không tìm thấy trang</p>
                <p className="text-gray-500 mb-0">Có vẻ như bạn đã nhầm đường dẫn, hãy thử nhớ lại đường dẫn xem!!!</p>
            </div>
        </div>

    )
}
