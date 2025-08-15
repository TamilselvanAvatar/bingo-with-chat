export default ({ children, If, className }) => {
    return If &&
        (
            <div className={className}>
                {children}
            </div>
        );
}