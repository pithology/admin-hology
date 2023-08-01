import basepath from "@/components/utils/path";
export default function Script(){
    return(
        <>
            <script src={`${basepath}/assets/vendor/apexcharts/apexcharts.min.js`}></script>
            <script src={`${basepath}/assets/vendor/bootstrap/js/bootstrap.bundle.min.js`}></script>
            <script src={`${basepath}/assets/vendor/chart.js/chart.umd.js`}></script>
            <script src={`${basepath}/assets/vendor/echarts/echarts.min.js`}></script>
            <script src={`${basepath}/assets/vendor/quill/quill.min.js`}></script>
            <script src={`${basepath}/assets/vendor/simple-datatables/simple-datatables.js`}></script>
            <script src={`${basepath}/assets/vendor/tinymce/tinymce.min.js`}></script>
            <script src={`${basepath}/assets/vendor/php-email-form/validate.js`}></script>
            <script src={`${basepath}/assets/vendor/bootstrap/js/bootstrap.bundle.min.js`}></script>
            <script src={`${basepath}/assets/js/main.js`}></script>
        </>
    )
}